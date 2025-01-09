import React from 'react';

import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Dashboard() {

  const dispatch = useDispatch();
  

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center py-4 bg-white shadow rounded-lg px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all">
            Logout
          </button>
        </header>

        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome, User!</h2>
              <p className="text-gray-700">Explore the Query Editor app and unleash the power of data exploration.</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Recent Queries</h2>
              <p className="text-gray-700">No recent queries found. Start querying now!</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
              <p className="text-gray-700">Update your personal information and preferences.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
