import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  const userId = location.state?.userId || "guest";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  const ELEVEN_API_KEY = import.meta.env.VITE_ELEVEN_API_KEY;
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

  // Setup speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
    } else {
      alert("Speech Recognition not supported!");
    }
  }, []);

  // Start recording user answer
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

  // Stop recording
  const stopRecording = () => {
    if (recognitionRef.current && recording) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  // Play question via Eleven Labs
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
      setIsSpeaking(false);
    }
  };

  // Move to next question
  const handleNext = async () => {
    stopRecording();

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

    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);
      setCurrentTranscript("");
      playQuestion(questions[next]);
    } else {
       try {
    const res = await axios.post(`http://localhost:5000/ai/evaluate`, {
      userId,
      questions,
      answers: [...answers, currentTranscript.trim()],
    });

    console.log("Interview evaluated:", res.data);
      alert("Interview completed! ✅");
    // Navigate to feedback page with AI evaluation
    navigate("/feedback", { state: { interview: res.data } });
  } catch (err) {
    console.error("Error evaluating interview:", err);
  }
    }
  };

  // Auto play first question
  useEffect(() => {
    if (questions.length > 0) playQuestion(questions[0]);
    else navigate("/");
  }, [questions, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Mock Interview</h1>

      <div className="flex w-full max-w-5xl bg-gray-800 p-6 rounded-2xl shadow-lg items-start gap-4">
        {/* AI Image */}
        <div className="flex flex-col items-center w-1/4 flex-shrink-0 mt-7">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            alt="AI"
            className="w-35 h-35 rounded-full border-4 border-blue-500 shadow-md"
          />
          <p className="mt-2 text-lg font-semibold">AI Interviewer</p>
          {isSpeaking && <p className="text-blue-400 mt-1 animate-pulse">Speaking...</p>}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center w-full px-4">
          {/* Question */}
          {questions.length > 0 && (
            <div className="bg-gray-700 p-4 rounded-xl shadow-inner w-full text-center mb-4">
              <p className="text-lg font-medium">
                <strong>Question {currentQuestion + 1}:</strong> {questions[currentQuestion]}
              </p>
            </div>
          )}

          {/* Answer */}
          <div className="bg-gray-600 p-4 rounded-xl shadow-inner w-full min-h-[100px] text-center">
            {recording ? (
              <p className="text-green-300 text-lg">{currentTranscript || "🎙️ Listening..."}</p>
            ) : (
              <p className="text-gray-300 text-lg">Your answer will appear here</p>
            )}
          </div>
        </div>

        {/* User Image */}
        <div className="flex flex-col items-center w-1/4 flex-shrink-0 mt-7">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-35 h-35 rounded-full border-4 border-green-500 shadow-md"
          />
          <p className="mt-2 text-lg font-semibold">You</p>
          {recording && <p className="text-green-400 mt-1 animate-pulse">Speaking...</p>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-6">
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
