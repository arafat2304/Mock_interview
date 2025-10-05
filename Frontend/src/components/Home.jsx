import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
  
  return (
    <div className='bg-gradient-to-r from-black via-gray-900 to-black min-h-screen px-6 pt-16'>
      <section className='lg:ml-[200px]  flex flex-col-reverse md:flex-row items-start max-w-6xl mx-auto'>
        
        {/* Left: Text Content */}
        <div className='flex flex-col gap-4 max-w-lg text-center md:text-left'>
          <h2 className='font-bold text-white text-2xl md:text-3xl leading-snug'>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className='text-white text-base md:text-lg'>
            Practice on real interview questions & get instant feedback
          </p>
          <Link
            to="/interview-page"
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

      {/*features section*/}

      <div className='mt-15 max-w-5xl mx-auto'>
        <h2 className='text-center text-2xl md:text-3xl font-bold text-white mb-10'> Features</h2>

        <div className='flex flex-col md:flex-row justify-center items-stretch gap-8'>
           {/* Card 1 */}
          <div className='flex-1 bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition text-center'>
            <div className="text-4xl">🎯</div>
            <h3 className="mt-4 text-xl font-semibold text-white">AI-Generated Questions</h3>
            <p className="mt-2 text-gray-400">Get interview questions tailored to your role & experience.</p>
          </div>
       
      

      {/* Card 2 */}
    <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition text-center">
      <div className="text-4xl">🎤</div>
      <h3 className="mt-4 text-xl font-semibold text-white">Voice Interaction</h3>
      <p className="mt-2 text-gray-400">
        Answer with your voice just like in a real interview.
      </p>
    </div>

     {/* Card 3 */}
    <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition text-center">
      <div className="text-4xl">📊</div>
      <h3 className="mt-4 text-xl font-semibold text-white">Instant Feedback</h3>
      <p className="mt-2 text-gray-400">
        Get instant reports with scores & suggestions for improvement.
      </p>
    </div>
     </div>
    </div>

    {/* Testimonials Section */}
    <div className='mt-20 max-w-5xl mx-auto'> 
      <h2 className='text-center text-2xl md:text-3xl font-bold text-white mb-10'> What Our Users Say </h2>
      <div className='flex flex-col md:flex-row gap-8'>

         {/* Testimonial 1 */}
      <div className='flex-1 bg-gray-900 p-6 rounded-2xl shadow-lg text-center'>
          <p className='text-gray-300 italic'>“This mock interview platform gave me the confidence I needed before my real interviews.”</p>
          <h3 className='mt-4 font-semibold text-white'>— Aisha, Software Engineer</h3>
      </div>
      

      {/* Testimonial 2 */}
    <div className="flex-1 bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
      <p className="text-gray-300 italic">
        “I loved the instant feedback. It showed me exactly where I needed to improve.”
      </p>
      <h3 className="mt-4 font-semibold text-white">— Rahul, Full-Stack Developer</h3>
    </div>

    {/* Testimonial 3 */}
    <div className="flex-1 bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
      <p className="text-gray-300 italic">
        “The voice interaction made it feel just like a real interview. Highly recommended!”
      </p>
      <h3 className="mt-4 font-semibold text-white">— Emily, Data Analyst</h3>
    </div>
    
    </div>
    </div>
    </div>
  );
};
