import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-6 '>
      <section className='flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full'>
        {/* Left: Text Content */}
        <div className='flex flex-col gap-6 max-w-xl text-center md:text-left'>
          <h2 className='font-bold text-white text-3xl md:text-4xl leading-tight'>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className='text-white text-lg md:text-xl'>
            Practice on real interview questions & get instant feedback
          </p>
          <Link
            to="/interview"
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 md:px-8 rounded-full transition duration-300 w-fit mx-auto md:mx-0'
          >
            Start an Interview
          </Link>
        </div>

        {/* Right: Robot Image */}
        <div className='mb-10 md:mb-0'>
          <img
            src="/robot.png"
            alt="robot"
            className='w-[300px] md:w-[400px] h-auto object-contain'
          />
        </div>
      </section>
    </div>
  );
};
