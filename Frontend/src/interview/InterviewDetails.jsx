import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InterviewDetail = () => {
  const { id } = useParams(); // get interview ID from URL
  const [interview, setInterview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ai/${id}`, {
          withCredentials: true
        });
        setInterview(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterview();
  }, [id]);

  if (!interview) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-6">
      {/* Back Button */}
      <button
        className="mb-6 text-blue-500 underline hover:text-blue-400"
        onClick={() => navigate('/history')}
      >
        ← Back to History
      </button>

      {/* Header Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{interview.role}</h1>
            <p className="text-gray-300 mb-1"><strong>Level:</strong> {interview.level}</p>
            <p className="text-gray-400"><strong>Date:</strong> {new Date(interview.createdAt).toLocaleString()}</p>
          </div>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold mt-4 md:mt-0">
            Score: {interview.score || 0} pts
          </span>
        </div>
      </div>

      {/* Questions & Answers */}
      <div className="max-w-4xl mx-auto space-y-4">
        {interview.questionFeedback.map((q, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-blue-500/30 transition cursor-pointer"
          >
            <p className="text-white font-semibold mb-2">Q{index + 1}: {q.question}</p>
            <p className="text-gray-300 mb-1"><strong>Your Answer:</strong></p>
            <p className="text-gray-200 mb-2">{q.answer || "No answer provided"}</p>
            <div className="flex justify-between items-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Score: {q.score || 0}
              </span>
              <p className="text-gray-300"><strong>Feedback:</strong> {q.feedback || "No feedback"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewDetail;
