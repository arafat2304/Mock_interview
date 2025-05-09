import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const register = async ()=>{
    try{
      const response = await axios.post("http://localhost:5000/user/register",{
        name,
        email,
        password,
        profilePic,
        resume
      },{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

    if(response.status == 201){
      navigate("/signin")
    }
  }catch(error){
    console.log(error)
  }
    
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white ">
      <form
        onSubmit={handleSubmit}
        className=" my-4 bg-gray-900 border border-gray-600 focus-within:border-white transition-all duration-300 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-5 "
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center">Practice Job Interview With AI</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="profilePic" className="mb-1">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="bg-white text-black px-2 py-1 rounded focus:outline-none"
            
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="resume" className="mb-1">Resume</label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="bg-white text-black px-2 py-1 rounded focus:outline-none"
            
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Your Account
        </button>
      </form>
    </div>
  );
};