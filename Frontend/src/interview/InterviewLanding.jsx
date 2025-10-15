import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const userId = location.state?.userId || "guest";
  const interviewId = location.state?.interviewId;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [loadingRedirect, setLoadingRedirect] = useState(false);

  const recognitionRef = useRef(null);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
    } else {
      alert("Speech Recognition not supported in this browser!");
    }
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    setRecording(true);
    setCurrentTranscript("");
    recognitionRef.current.start();

    let fullTranscript = "";

    recognitionRef.current.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) fullTranscript += transcript + " ";
        else interim += transcript;
      }
      setCurrentTranscript(fullTranscript + interim);
    };

    recognitionRef.current.onerror = (e) => {
      console.error("Speech error:", e);
      setRecording(false);
    };
  };

  const stopRecording = () => {
    if (recognitionRef.current && recording) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  // Play question using backend-generated ElevenLabs audio
  const playQuestion = async (text) => {
    try {
      if (!text) return;
      setIsSpeaking(true);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tts`, { text });
      const base64 = res.data.audio;
      const audioSrc = `data:audio/mpeg;base64,${base64}`;
      const audio = new Audio(audioSrc);

      audio.onended = () => setIsSpeaking(false);
      await audio.play();
    } catch (err) {
      console.error("Error playing TTS audio:", err);
      setIsSpeaking(false);
    }
  };

  const handleNext = async () => {
    stopRecording();

    const currentAnswer = currentTranscript.trim();
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);

    // Save answer to backend
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/answer`, {
        userId,
        question: questions[currentQuestion],
        answer: currentAnswer,
      });
    } catch (err) {
      console.error("Error saving answer:", err);
    }

    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setCurrentTranscript("");
      playQuestion(questions[next]);
    } else {
      try {
        setLoadingRedirect(true);
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/evaluate`, {
          interviewId,
          userId,
          questions,
          answers: [...answers, currentAnswer],
        });

        setTimeout(() => {
          navigate("/feedback", { state: { interview: res.data } });
        }, 1500);
      } catch (err) {
        console.error("Error evaluating interview:", err);
        setLoadingRedirect(false);
      }
    }
  };

  useEffect(() => {
    if (questions.length > 0) playQuestion(questions[0]);
    else navigate("/");
  }, [questions]);

  if (loadingRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white flex-col">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
          alt="AI"
          className="w-28 h-28 animate-bounce mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Interview Completed! ✅</h2>
        <p className="text-lg text-gray-300 animate-pulse">
          Redirecting to Feedback Page...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Mock Interview</h1>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg gap-6">
        {/* AI Panel */}
        <div className="flex flex-col items-center md:w-1/4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            alt="AI"
            className="w-24 h-24 md:w-35 md:h-35 rounded-full border-4 border-blue-500 shadow-md"
          />
          <p className="mt-2 text-lg font-semibold">AI Interviewer</p>
          {isSpeaking && <p className="text-blue-400 mt-1 animate-pulse">Speaking...</p>}
        </div>

        {/* QA Panel */}
        <div className="flex-1 flex flex-col items-center w-full md:px-4">
          {questions.length > 0 && (
            <div className="bg-gray-700 p-4 rounded-xl shadow-inner w-full text-center mb-4">
              <p className="text-lg font-medium">
                <strong>Question {currentQuestion + 1}:</strong> {questions[currentQuestion]}
              </p>
            </div>
          )}
          <div className="bg-gray-600 p-4 rounded-xl shadow-inner w-full min-h-[120px] text-center">
            {recording ? (
              <p className="text-green-300 text-lg">
                {currentTranscript || "🎙️ Listening..."}
              </p>
            ) : (
              <p className="text-gray-300 text-lg">Your answer will appear here</p>
            )}
          </div>
        </div>

        {/* User Panel */}
        <div className="flex flex-col items-center md:w-1/4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-24 h-24 md:w-35 md:h-35 rounded-full border-4 border-green-500 shadow-md"
          />
          <p className="mt-2 text-lg font-semibold">You</p>
          {recording && <p className="text-green-400 mt-1 animate-pulse">Speaking...</p>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-5xl justify-center">
        <button
          onClick={() => playQuestion(questions[currentQuestion])}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
        >
          Play Question
        </button>

        <button
          onClick={startRecording}
          disabled={recording}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
        >
          Start Answer
        </button>

        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Interview;
