import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewPage() {

  const navigate = useNavigate();


  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user._id;
 const userPhotoPath = user?.photo
 const backendURL = "http://localhost:5000/"; // your backend base URL
 const userPhoto = userPhotoPath
  ? `${backendURL}${userPhotoPath.replace("\\", "/")}`
  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // State for interview setup
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    type: "Technical",
    questionCount: "",
    techStack:""
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When "Generate Interview" is clicked
  const handleStartInterview = async () => {
    if (!formData.role || !formData.experience || !formData.questionCount) {
      alert("Please fill all fields!") 
    }else{
      try{
        const response =await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/generate`,{
          formData,
          userId
        })
        console.log(response)
        if(response.status==201){
          const generatedQuestions = response.data.questions;
          navigate("/interview",{state:{questions:generatedQuestions,userId:user._id,interviewId: response.data.interviewId}});
        }
      }catch(e){
        console.log(e);
      }
    }
  
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white pt-0 p-6 ">
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
                name="techStack"
                placeholder="Enter Tech Stack (e.g. React, Node.js, MongoDB)"
                value={formData.techStack}
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
        </div>
  );
}

export default InterviewPage;
