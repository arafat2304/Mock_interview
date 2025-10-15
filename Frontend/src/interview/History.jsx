import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user._id;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ai/history?userId=${userId}`, {
          withCredentials: true
        });
        if (Array.isArray(res.data)) setInterviews(res.data);
        else setInterviews([]);
      } catch (err) {
        console.error(err);
        setInterviews([]);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">Interview History</h1>
        <div className="bg-gray-800 shadow-lg rounded-xl px-6 py-3 text-white font-semibold">
          Total Interviews: <span className="text-blue-500">{interviews.length}</span>
        </div>
      </div>

      {/* Grid of interview cards */}
      {interviews.length === 0 ? (
        <p className="text-gray-400 text-lg">No interviews conducted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              onClick={() => navigate(`/history/${interview._id}`)}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-blue-500/30 hover:scale-105 transform transition-all cursor-pointer"
            >
              {/* Date & Score */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-sm">{new Date(interview.createdAt).toLocaleDateString()}</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                  {interview.score || 0} pts
                </span>
              </div>

              {/* Role & Level */}
              <h2 className="text-2xl font-bold text-white mb-2">{interview.role}</h2>
              <p className="text-gray-300 mb-1"><strong>Expirience:</strong> {interview.level} year</p>
              <p className="text-gray-300"><strong>Questions:</strong> {interview.questions?.length || 0}</p>

              {/* Footer badge */}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
