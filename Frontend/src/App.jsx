import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from './components/Home';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import './App.css';
import { Logout } from './auth/Logout';
import About from "./components/About";
import Navbar from './components/Navbar';
import History from './interview/History';
import InterviewPage from './interview/InterviewPage';
import InterviewLanding from './interview/InterviewLanding';
import FeedbackPage from './interview/FeedbackPage';
import InterviewDetails from './interview/InterviewDetails';

// PrivateRoute wrapper to protect pages
function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
         <Route path="/history/:id" element={<InterviewDetails />} />
        <Route 
          path="/history" 
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } />

        {/* Protected routes */}
        <Route
          path="/interview-page"
          element={
            <PrivateRoute>
              <InterviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <PrivateRoute>
              <InterviewLanding />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
