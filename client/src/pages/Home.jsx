import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { Database, LogIn } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
              <Database className="w-16 h-16 text-sky-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Welcome to Query Editor
            </h1>
            
            <p className="text-lg text-slate-800 leading-relaxed max-w-xl mx-auto">
              {user 
                ? "Transform your data exploration journey with our powerful query tools. Set up your database connection and unlock valuable insights."
                : "Join us to explore and analyze your data with precision. Sign in to begin your data discovery journey."}
            </p>

            <div className="pt-6">
              {user ? (
                <Link to="/setup">
                  <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                    <span className="relative flex items-center gap-2">
                      Get Started
                      <Database className="w-5 h-5" />
                    </span>
                  </button>
                </Link>
              ) : (
                <Link to="/sign-in">
                  <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                    <span className="relative flex items-center gap-2">
                      Sign In
                      <LogIn className="w-5 h-5" />
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}