import React, { useState } from 'react';


const Agent = () => {
  const isSpeaking = true;
  let cs = {
    ACTIVE : "ACTIVE",
    CONNECTIG : "CONNECTING",
    FINISHED : "FINISHED",
    INACTIVE : "INACTIVE"
  };

  const message = [
    "What is your name ?",
    "My name is Arafat Raza, nice to meet you"
  ]
  const lastMessage = message[message.length-1];
  let [callStatus,setCallStatus] = useState(cs.INACTIVE)

  return (
    <div className='mt-5 px-4'>
      <h2 className='text-white text-lg font-semibold mb-4'>Interview Generation</h2>
      <div className='flex sm:flex-row flex-col gap-6 items-center justify-center '>

        {/* AI Interviewer Card */}
        <div className='h-[250px] flex-center flex-col gap-2 p-6 blue-gradient-dark rounded-lg border-2 border-white border-opacity-50 flex-1 sm:basis-1/2 w-full'>
          <div className='relative size-[120px] ml-13 flex items-center justify-center md:ml-52 '>
            {isSpeaking && (
              <span className='absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping'></span>
            )}
            <div className='relative z-10 bg-white rounded-full size-[100px] flex items-center justify-center'>
              <img src="ai-avatar.png" alt="AI Avatar" className='w-[40px] h-[40px] object-contain' />
            </div>
          </div>
          <h3 className='text-center text-white mt-3 font-bold'>AI Interviewer</h3>
        </div>

        {/* User Card */}
        <div className='sm:flex hidden h-[250px] flex-center flex-col gap-2 p-6 bg-gradient-to-b from-gray-800 to-black rounded-lg border-2 border-white border-opacity-50 flex-1 sm:basis-1/2 w-full'>
          <div className='relative  ml-13 size-[120px] flex items-center justify-center md:ml-50'>
            <div className='relative z-10 bg-white rounded-full size-[100px] overflow-hidden'>
              <img src="user-avatar.jpg" alt="User Avatar" className='w-full h-full object-cover rounded-full' />
            </div>
          </div>
          <h3 className='text-center text-white mt-3 font-bold'>You</h3>
        </div>

      </div>

      {message.length > 0 && 
        <div className='border border-white rounded-2xl mt-2'>
          <div className='bg-dark-gradient rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center'>
            <p key={lastMessage} className='text-lg text-center text-white'>
              {lastMessage}
            </p>
          </div>
        </div>}

       <div className="w-full flex justify-center">
      {callStatus !== 'ACTIVE' ? (
        <button className="text-white bg-green-500 py-1 px-10 rounded-full mt-10">
          <span>
            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
          </span>
        </button>
      ) : (
        <button className="text-white bg-red-500 py-1 px-7 rounded-full mt-10">
          End
        </button>
      )}
    </div>
  
    </div>
  );
};

export default Agent;
