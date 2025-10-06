import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewPage() {
  const navigate = useNavigate();

 const user = JSON.parse(sessionStorage.getItem('user'));
 const userPhotoPath = user.photo
 const backendURL = "http://localhost:5000/"; // your backend base URL
 const userPhoto = userPhotoPath
  ? `${backendURL}${userPhotoPath.replace("\\", "/")}`
  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

 console.log(user)
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
    }
  }, [navigate]);

  // State for interview setup
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    type: "Technical",
    questionCount: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When "Generate Interview" is clicked
  const handleStartInterview = () => {
    if (!formData.role || !formData.experience || !formData.questionCount) {
      alert("Please fill all fields!");
      return;
    }
    // Later we’ll call backend (Gemini) here
    setIsInterviewStarted(true);
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white pt-0 p-6 ">
      {!isInterviewStarted ? (
        // ---------------- Setup Form ----------------
        <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-lg ">
          <h2 className="text-2xl font-bold text-center mb-6">
            🎯 Start Your AI Interview
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="role"
              placeholder="Enter Job Role (e.g. MERN Developer)"
              value={formData.role}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 outline-none"
            />

            <input
              type="text"
              name="experience"
              placeholder="Enter Experience (e.g. 2 years)"
              value={formData.experience}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 outline-none"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 outline-none"
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Both">Both</option>
            </select>

            <input
              type="number"
              name="questionCount"
              placeholder="How many questions?"
              value={formData.questionCount}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 outline-none"
            />

            <button
              onClick={handleStartInterview}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition font-semibold"
            >
              Generate Interview
            </button>
          </div>
        </div>
      ) : (
        // ---------------- Interview Screen ----------------
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-2xl shadow-lg flex justify-between items-center">
          {/* Left (AI) */}
          <div className="flex flex-col items-center gap-4 w-1/2">
            <img
              src="logo.png"
              alt="AI Interviewer"
              className="w-40 h-40 rounded-full border-4 border-blue-500 cover-object"
            />
            <p className="text-xl font-semibold">AI Interviewer</p>
          </div>

          {/* Right (User) */}
          <div className="flex flex-col items-center gap-4 w-1/2">
            <img
              src={userPhoto}
              alt="User"
              className="w-40 h-40 rounded-full border-4 border-green-500"
            />
            <p className="text-xl font-semibold">{user.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewPage;
