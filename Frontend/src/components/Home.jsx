import React from 'react';
import { Link } from 'react-router-dom';
import { dummyInterviews } from '../../constants';
import InterviewCard from './InterviewCard';

export const Home = () => {
  return (
    <div className='bg-gradient-to-r from-black via-gray-900 to-black min-h-screen px-6 pt-16'>
      <section className='lg:ml-[200px]  flex flex-col-reverse md:flex-row items-start max-w-5xl mx-auto'>
        
        {/* Left: Text Content */}
        <div className='flex flex-col gap-4 max-w-lg text-center md:text-left'>
          <h2 className='font-bold text-white text-2xl md:text-3xl leading-snug'>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className='text-white text-base md:text-lg'>
            Practice on real interview questions & get instant feedback
          </p>
          <Link
            to="/interview"
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300 w-fit mx-auto md:mx-0'
          >
            Start an Interview
          </Link>
        </div>

        {/* Right: Robot Image */}
        <div className='ml-19 mb-8 md:mb-0 md:ml-10'>
          <img
            src="/robot.png"
            alt="robot"
            className='w-[160px] md:w-[220px] h-auto object-contain'
          />
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8 lg:ml-[200px]'>
          <h2 className='font-bold text-white'>Your Interviews</h2>

          <div className='lg:flex flex-row gap-3'>
            {dummyInterviews.map((interview, index) => (
              <InterviewCard key={index} data={interview} />
          ))}

          </div>
      </section>

      <section className='flex flex-col gap-6 mt-8 lg:ml-[200px]'>
          <h2 className='font-bold text-white'>Take an Interview</h2>
           <div>
              {dummyInterviews.map((interview, index) => (
              <InterviewCard key={index} data={interview} />
          ))}
          </div>
      </section>

    </div>
  );
};
