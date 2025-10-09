import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './components/Home';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import './App.css'
import {Logout} from './auth/Logout';
import About  from "./components/About";
import Navbar from './components/Navbar';
import History from './components/History';
import InterviewPage from './interview/InterviewPage';
import InterviewLanding from './interview/InterviewLanding';
import FeedbackPage from './interview/FeedbackPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path='/about' element={<About/>} />
        <Route path='/history' element={<History/>} />
        <Route path='/interview-page' element={<InterviewPage/>} />
        <Route path='/interview' element={<InterviewLanding/>} />
        <Route path='/feedback' element={<FeedbackPage/>} />
     </Routes>
    </>
  )
}

export default App
