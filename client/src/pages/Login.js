
import './Login.css'
import React, { useState } from 'react';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = (e) => {
      e.preventDefault();
      // Send a request to your server with the user's email and password
      // If the credentials are correct, redirect the user to the home page
      
  }
  return (
    <div className=" h-screen flex items-center justify-center bg-books bg-cover ">
    <form className="bg-white p-6 rounded-lg shadow-md w-1/3 h-1/2 flex flex-col justify-center" onSubmit={handleSubmit}>
        <h1 className="text-lg mb-4 mx-auto uppercase text-sky-800 font-sans md:font-serif " >Login</h1>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
                className="border border-gray-400 p-2 rounded-lg w-full" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
                className="border border-gray-400 p-2 rounded-lg w-full" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className=' mb-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 w-1/2 mx-auto'>Sumbit</button>
        </form>
        </div>
  )
}

export default Login