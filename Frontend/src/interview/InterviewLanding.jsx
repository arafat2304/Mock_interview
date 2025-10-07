import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const userId = location.state?.userId || "guest";
  console.log(userId)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState(""); // 👈 store ongoing speech

  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  const ELEVEN_API_KEY = import.meta.env.VITE_ELEVEN_API_KEY;
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🎙️ Setup recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true; // 👈 keep listening until manually stopped
      recognitionRef.current.interimResults = true;
    } else {
      alert("Speech Recognition not supported in this browser!");
    }
  }, []);

  // 🎧 Start recording
  const startRecording = () => {
    if (!recognitionRef.current) return;
    setRecording(true);
    setCurrentTranscript(""); // reset before answer starts
    recognitionRef.current.start();

    let fullTranscript = "";

    recognitionRef.current.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          fullTranscript += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setCurrentTranscript(fullTranscript + interim);
    };

    recognitionRef.current.onerror = (e) => {
      console.error("Speech error:", e);
      setRecording(false);
    };
  };

  // 🛑 Stop recording manually (not auto)
  const stopRecording = () => {
    if (recognitionRef.current && recording) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  // 🔊 Play question (Eleven Labs)
  const playQuestion = async (text) => {
    try {
      setIsSpeaking(true);
      const res = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        },
        {
          headers: {
            "xi-api-key": ELEVEN_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = audioURL;
        audioRef.current.play();
      }
    } catch (err) {
      console.error("Eleven Labs error:", err);
    }
  };

  // ⏭ Handle Next question
  const handleNext = async () => {
    stopRecording(); // 👈 stop listening first

    const currentAnswer = currentTranscript.trim();
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);

    // Save to backend
    try {
      await axios.post(`http://localhost:5000/ai/answer`, {
        userId,
        question: questions[currentQuestion],
        answer: currentAnswer,
      });
      console.log("Answer saved");
    } catch (err) {
      console.error("Error saving answer:", err);
    }

    // Move next
    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setCurrentTranscript("");
      playQuestion(questions[next]);
    } else {
      alert("Interview completed! ✅");
      // navigate("/thankyou", { state: { answers: newAnswers } });
    }
  };

  // 🟢 Auto start first question
  useEffect(() => {
    if (questions.length > 0) playQuestion(questions[0]);
    else navigate("/");
  }, [questions, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Mock Interview</h1>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* AI */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            alt="AI"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <p className="mt-3 text-lg font-semibold">AI Interviewer</p>
          {isSpeaking && <p className="text-blue-400 mt-2 animate-pulse">Speaking...</p>}
        </div>

        {/* Question */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 text-center p-4">
          {questions.length > 0 && (
            <div className="bg-gray-700 p-6 rounded-xl shadow-inner w-full">
              <p className="text-lg font-medium">
                <strong>Question {currentQuestion + 1}:</strong> {questions[currentQuestion]}
              </p>
            </div>
          )}
          {recording && (
            <p className="mt-4 text-sm text-gray-300 italic">
              🎙️ Speaking: {currentTranscript}
            </p>
          )}
        </div>

        {/* User */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
          />
          <p className="mt-3 text-lg font-semibold">You</p>
          {recording && <p className="text-green-400 mt-2 animate-pulse">Listening...</p>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => playQuestion(questions[currentQuestion])}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Play Question
        </button>

        <button
          onClick={startRecording}
          disabled={recording}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Start Answer
        </button>

        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Next
        </button>
      </div>

      <audio ref={audioRef} onEnded={() => setIsSpeaking(false)} />
    </div>
  );
}

export default Interview;
