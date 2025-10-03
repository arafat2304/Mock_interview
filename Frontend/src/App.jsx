import { useState } from 'react'
import {Route,Routes} from "react-router-dom"
import { Home } from './components/Home';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import './App.css'
import {Logout} from './auth/Logout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/logout" element={<Logout/>}/>
     </Routes>
    </>
  )
}

export default App
