import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const interview = location.state?.interview;

  console.log("🧠 Received interview data:", interview.interview);

  if (!interview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-950">
        <p className="text-lg mb-4">No feedback data found.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { score = 0, feedback = "", questionFeedback = [] } = interview.interview;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-6 md:px-16">
      {/* Overall Feedback Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Interview Feedback
        </h1>

        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h2 className="text-2xl font-semibold mb-2">
            Overall Score:{" "}
            <span className="text-blue-400">{score}/100</span>
          </h2>
          <p className="text-gray-300">
            {feedback || "No overall feedback yet."}
          </p>
        </div>
      </div>

      {/* Question-wise Feedback Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        {questionFeedback.length > 0 ? (
          questionFeedback.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl shadow-md p-5 border border-gray-800 hover:shadow-blue-500/20 transition"
            >
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Q{index + 1}: {item.question}
              </h3>

              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-green-400">
                  Your Answer:
                </span>{" "}
                {item.answer || "No answer provided."}
              </p>

              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-yellow-400">
                  AI Score:
                </span>{" "}
                {item.score ?? "N/A"}/10
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-purple-400">
                  Feedback:
                </span>{" "}
                {item.feedback || "No feedback provided."}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No question feedback available.
          </p>
        )}
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
