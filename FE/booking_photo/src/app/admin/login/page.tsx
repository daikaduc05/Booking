'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Login = () => {
  const [key, setKey] = useState('');
  const router = useRouter();

  const handleSubmit = async(e :any) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/auth/authenticate', { key });
    if(res){
        Cookies.set('key', res.data.key, { expires: 1/24 });
        router.push('/admin');
        toast.success('Login success');
    }
    else{
        toast.error('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
