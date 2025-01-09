import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

const SqlQueryApp = () => {
  const [query, setQuery] = useState('');
  const [validationResponse, setValidationResponse] = useState('');
  const [placeholders, setPlaceholders] = useState([]);
  const [parameterValues, setParameterValues] = useState([]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    const fetchQueryHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/queries/');
        const data = await response.json();
        setQueryHistory(data);
      } catch (error) {
        console.error('Error fetching query history:', error);
      }
    };

    fetchQueryHistory();
  }, []);

  const extractParameterNames = (query) => {
    const regex = /\b(\w+)\s*=\s*\?/g;
    let match;
    const parameterNames = [];
    while ((match = regex.exec(query)) !== null) {
      parameterNames.push(match[1]);
    }
    return parameterNames;
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleParameterChange = (index, value) => {
    const newParams = [...parameterValues];
    newParams[index] = value;
    setParameterValues(newParams);
  };

  const validateQuery = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/validate-query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setValidationResponse(data.validation_response);

      const placeholderCount = (query.match(/\?/g) || []).length;

      if (placeholderCount > 0) {
        const extractedPlaceholders = extractParameterNames(query);
        if (extractedPlaceholders.length === 0) {
          const genericPlaceholders = Array.from(
            { length: placeholderCount },
            (_, index) => `Param${index + 1}`
          );
          setPlaceholders(genericPlaceholders);
        } else {
          setPlaceholders(extractedPlaceholders);
        }

        setParameterValues(new Array(placeholderCount).fill(''));
      } else {
        setPlaceholders([]);
        setParameterValues([]);
      }
    } catch (error) {
      setValidationResponse('Error validating query');
    } finally {
      setIsLoading(false);
    }
  };

  const runQuery = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/run-query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          parameters: parameterValues,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setResult(`Error: ${data.detail}`);
      } else {
        if (data.result && Array.isArray(data.result)) {
          setResult(JSON.stringify(data.result, null, 2));
        } else {
          setResult(data.result);
        }
      }
    } catch (error) {
      setResult(`Unexpected Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearInputs = () => {
    setQuery('');
    setValidationResponse('');
    setPlaceholders([]);
    setParameterValues([]);
    setResult('');
  };

  const handleQuerySelect = (selectedQuery) => {
    setQuery(selectedQuery.query);
    setValidationResponse('');
    setPlaceholders([]);
    setParameterValues([]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <h3 className="p-4 text-lg font-semibold text-gray-700 border-b border-gray-200">Query History</h3>
        <ul className="divide-y divide-gray-200">
          {queryHistory.map((item) => (
            <li
              key={item.id}
              onClick={() => handleQuerySelect(item)}
              className="p-3 hover:bg-gray-50 cursor-pointer text-gray-600 text-sm"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col mr-96">
        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Write Your SQL Query Here</h1>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm mb-4"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter your SQL query here"
          />
          <div className="flex gap-4 mb-4">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
              onClick={validateQuery} 
              disabled={isLoading}
            >
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Validate Query'}
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
              onClick={clearInputs}
            >
              <FontAwesomeIcon icon={faTrash} /> Clear
            </button>
          </div>
          
          {validationResponse && (
            <p className="text-red-500 mb-4">{validationResponse}</p>
          )}

          {(placeholders.length > 0 || validationResponse.trim() !== '') && (
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              {placeholders.length > 0 && (
                <>
                  {placeholders.map((label, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <label className="min-w-[100px] text-gray-700">{label}:</label>
                      <input
                        type="text"
                        value={parameterValues[index]}
                        onChange={(e) => handleParameterChange(index, e.target.value)}
                        placeholder={`Enter value for ${label}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </>
              )}
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                onClick={runQuery} 
                disabled={isLoading}
              >
                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Run Query'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-96 bg-white shadow-lg overflow-y-auto fixed right-0 top-0 h-full border-l border-gray-200">
        {result && (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Query Result:</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SqlQueryApp;