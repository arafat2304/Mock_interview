import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 👈 import AuthContext

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 👈 access login() from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://ai-mock-interview-backend-cs6x.onrender.com/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Store token + user info
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Update global auth state so Navbar re-renders
        login(response.data.token);

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setValid(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-600 focus-within:border-white transition-all duration-300 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Practice Job Interview With AI
        </h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-red-500 text-center">{valid}</p>
      </form>
    </div>
  );
};
