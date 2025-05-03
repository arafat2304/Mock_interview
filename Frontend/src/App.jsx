import { useState } from 'react'
import {Route,Routes} from "react-router-dom"
import { Home } from './components/Home';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='signup' element={<SignUp/>}/>
        <Route path='signin' element={<SignIn/>}/>
     </Routes>
    </>
  )
}

export default App
