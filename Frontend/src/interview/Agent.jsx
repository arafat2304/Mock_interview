import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vapi from "@vapi-ai/web";

const Agent = ({userName,userId,type}) => {
const vapi2 = new vapi(import.meta.env.VITE_VAPI_PUBLIC_TOKEN);
  const naviagte = useNavigate();
  let cs = {
    ACTIVE : "ACTIVE",
    CONNECTIG : "CONNECTING",
    FINISHED : "FINISHED",
    INACTIVE : "INACTIVE"
  };

  const savedMessage = {
    role : 'user',
    content: '',
  };

  const [isSpeaking,setIsSpeaking]=useState(false);
  let [callStatus,setCallStatus] = useState(cs.INACTIVE);
  const [message,setMessage]=useState([]);

  useEffect(()=>{
    const onCallStart = () => setCallStatus(cs.ACTIVE);
    const onCallEnd = () => setCallStatus(cs.FINISHED);

    const onMessage = (messageEvent) => {
  if (messageEvent.type === 'transcript' && messageEvent.transcriptType === 'final') {
    const newMessage = {
      role: messageEvent.role,
      content: messageEvent.transcript,
    };
    setMessage((prev) => [...prev, newMessage]);
  }
};


    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error) => console.log('error',error);

    vapi2.on('call-start',onCallStart);
    vapi2.on('call-end',onCallEnd);
    vapi2.on('message',onMessage);
    vapi2.on('speech-start',onSpeechStart);
    vapi2.on('speech-end',onSpeechEnd);
    vapi2.on('error',onError);

    return () => {
    vapi2.off('call-start',onCallStart);
    vapi2.off('call-end',onCallEnd);
    vapi2.off('message',onMessage);
    vapi2.off('speech-start',onSpeechStart);
    vapi2.off('speech-end',onSpeechEnd);
    vapi2.off('error',onError);
  }
  },[]);

  useEffect(()=>{
    if(callStatus === cs.FINISHED) naviagte('/');
  },[message,callStatus,type,userId])
   const handlecall = async () =>{
        setCallStatus(cs.CONNECTIG);
        await vapi2.start(import.meta.env.VITE_VAPI_WORKFLOW_ID,{
          variableValues:{
            userName,
            userId
          }
        })
    }

    const handleDisconnect = async () =>{
      setCallStatus(cs.FINISHED);

      vapi2.stop();
    }

    const latestMessage = message[message.length-1]?.content;
    const isCallInactiveOrFinished = callStatus === cs.INACTIVE || callStatus === cs.FINISHED;

  
  

  const user = JSON.parse(localStorage.getItem("user"));
  // const message = [
  //   "What is your name ?",
  //   "My name is Arafat Raza, nice to meet you"
  // ];

  // const lastMessage = message[message.length-1];
 

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
          <div className='relative size-[120px] flex items-center justify-center md:ml-50'>
            <div className='relative z-10 bg-white rounded-full size-[100px] overflow-hidden'>
              <img src={`${import.meta.env.VITE_Backend_URL}/${user.photo}`} alt="User Avatar" className='w-full h-full object-cover rounded-full' />
            </div>
          </div>
          <h3 className='text-center text-white mt-3 font-bold'>{user.name}</h3>
        </div>

      </div>

      {message.length > 0 && 
        <div className='border border-white rounded-2xl mt-2 md:w-1/2 md:ml-70'>
          <div className='bg-dark-gradient rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center '>
            <p key={latestMessage} className='text-lg text-center text-white'>
              {latestMessage}
            </p>
          </div>
        </div>}

      <div className="w-full flex justify-center">
      {callStatus !== 'ACTIVE' ? (
        <button className="relative text-white bg-green-500 py-1 px-7 mt-5 rounded-xl text-xl font-bold " onClick={handlecall}>
          <span className={`absolute animate-ping rounded-full opacity-75 ${callStatus !== 'CONNECTING' ? 'hidden' : ''}`} />
          <span>
            {isCallInactiveOrFinished ? 'Call' : '....'}
          </span>
        </button>
      ) : (
        <button className="bg-red-500 text-white py-1 px-7 rounded-full mt-10" onClick={handleDisconnect}>
          End
        </button>
      )}
    </div>
  

  
    </div>
  );
};

export default Agent;
