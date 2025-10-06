import React from "react";
import { useState } from "react";

const Navbar = () => {

    const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-400 cursor-pointer">
        Mock Interview AI
      </div>

      {/* Middle: Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg">
        <li><a href="/home" className="hover:text-blue-400 cursor-pointer transition">Home</a></li>
        <li><a href="/about" className="hover:text-blue-400 cursor-pointer transition">About</a></li>
        <li><a href="/history" className="hover:text-blue-400 cursor-pointer transition">History</a></li>
        <li className="hover:text-blue-400 cursor-pointer transition">Contact</li>
      </ul>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        <button className="hidden md:block px-5 py-2 rounded-xl bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition">
         <a href="/signIn">Login</a>
        </button>
        <button className=" hidden md:block px-5  py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
          <a href="/interview-page">Start Interview</a>
        </button>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-2">
          <button onClick={() => setOpen(!open)}>
            {open ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 flex flex-col text-center space-y-4 py-4 md:hidden">
          <li><a href="/home" className="hover:text-blue-400 cursor-pointer transition">Home</a></li>
          <li><a href="/about" className="hover:text-blue-400 cursor-pointer transition">About</a></li>
          <li><a href="/history" className="hover:text-blue-400 cursor-pointer transition">History</a></li>
          <li className="hover:text-blue-400 cursor-pointer transition">Contact</li>
          <li><a href="/signUp" className="hover:text-blue-400 cursor-pointer transition">Login</a></li>
        </ul>
      )}
    </nav>
  ); 
};

export default Navbar;
