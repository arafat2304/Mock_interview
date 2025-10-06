import react from 'react';
import { useEffect, useState } from "react";
import { ElevenLabsClient, stream } from "@elevenlabs/elevenlabs-js";

const InterviewLanding = () =>{

    const client = new ElevenLabsClient({
  apiKey: process.env.REACT_APP_ELEVEN_API_KEY,
});

const [questions, setQuestions] = useState([]); // from backend
const [currentIndex, setCurrentIndex] = useState(0);
const [isSpeaking, setIsSpeaking] = useState(false);




    return;
}

export default InterviewLanding;