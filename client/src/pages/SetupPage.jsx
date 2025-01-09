import React, {useState} from "react";
import axios from "axios";

const SetupPage=()=>{
    const[formData, setFormData]=
    useState({
        sourceType: "",
        hostUrl: "",
        username: "",
        password: "",
        databaseName: "",

    });

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({...prev,[name]: value}));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:8000/api/connect",formData);
            alert(response.data.message);
        }
        catch(error){
            alert(error.response?.data?.message|| "Connection failed!");
        }
    };


    return(
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-xl font-bold mb-4">Setup Database Connection</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Source Type</label>
                    <select name="sourceType" value={formData.sourceType} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="redshift">Redshift</option>
                        <option value="mongodb">MongoDB</option>
                        <option value="postgresql">PostgreSQL</option>

                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">HostURL</label>
                    <input type="text" name="hostUrl" value={formData.hostUrl} onChange={handleChange} className="w-full p-2 border rounded" required/>

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" required/>



                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required/>



                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Database Name</label>
                    <input type="text" name="databaseName" value={formData.databaseName} onChange={handleChange} className="w-full p-2 border rounded" required/>



                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Connect</button>

            </form>
        </div>
    );
};

export default SetupPage;