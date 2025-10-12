import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InterviewDetail = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ai/${id}`, {
          withCredentials: true,
        });
        setInterview(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterview();
  }, [id]);

  if (!interview)
    return (
      <p className="text-white text-center mt-20 text-lg animate-pulse">
        Loading interview details...
      </p>
    );

  const { aiAnswers = [], feedback = '' } = interview;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 p-6">
      {/* Back Button */}
      <button
        className="mb-6 text-blue-400 hover:text-blue-300 transition-colors"
        onClick={() => navigate('/history')}
      >
        ← Back to History
      </button>

      {/* Header Card */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 max-w-4xl mx-auto border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">
              {interview.role}
            </h1>
            <p className="text-gray-300">
              <strong>Experience: {interview.level} year</strong>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              <strong>Date:</strong>{' '}
              {new Date(interview.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Overall Score */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-1">Overall Score</p>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-2.5 rounded-full font-semibold text-lg shadow-lg">
              {interview.score || 0} / 100
            </div>
          </div>
        </div>
      </div>

      {/* Overall Feedback */}
      {feedback && (
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 max-w-4xl mx-auto border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            Overall Feedback
          </h2>
          <p className="text-gray-300">{feedback}</p>
        </div>
      )}

      {/* Questions & Answers */}
      <div className="max-w-4xl mx-auto space-y-6">
        {interview.questionFeedback.map((q, index) => (
          <div
            key={index}
            className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-semibold text-lg leading-snug w-[85%]">
                Q{index + 1}: {q.question}
              </p>
              <span
                className={`px-5 py-1.5 rounded-full text-sm font-medium shadow-md whitespace-nowrap ${
                  q.score >= 7
                    ? 'bg-green-600/80 text-white'
                    : q.score >= 4
                    ? 'bg-yellow-600/80 text-white'
                    : 'bg-red-600/80 text-white'
                }`}
              >
                {q.score || 0} / 10
              </span>
            </div>

            <div className="mt-3">
              {/* User Answer */}
              <p className="text-blue-400 font-medium mb-1">Your Answer:</p>
              <p className="text-gray-200 mb-4">
                {q.answer || 'No answer provided'}
              </p>

              {/* AI Answer */}
              {aiAnswers[index] && (
                <>
                  <p className="text-purple-400 font-medium mb-1">AI Answer:</p>
                  <p className="text-gray-300 mb-4">{aiAnswers[index]}</p>
                </>
              )}

              {/* Feedback */}
              <div className="bg-gray-700/40 rounded-xl p-4">
                <p className="text-gray-300">
                  <span className="font-semibold text-blue-400">Feedback: </span>
                  {q.feedback || 'No feedback available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewDetail;
