import React, { useState } from 'react'

export const SignUp = () => {

  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  return (
    <div className='  flex flex-col items-center justify-center bg-black h-screen '>
      <div className='card-border border-white py-3 px-3'>
        <h4 className='text-xl font-semibold text-white flex flex-col items-center justify-center'>Practice Job Interviews with AI</h4>
      

      <div>
        <form>
          <div className='mt-5'>
          <label class="block text-white mb-3" for="email">Full Name</label>
          <input type="text" value={fullName}  onChange={(e)=>setFullName(e.target.value)} className='ml-1 w-[400px] mb-3 bg-white text-black px-4 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
          {console.log(fullName)}
          <div className='mt-1'>
          <label class="block text-white mb-3" for="email">Email</label>
          <input type="text" className='ml-1 w-[400px] mb-3 bg-white text-black px-4 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div className='mt-1'>
          <label class="block text-white mb-3" for="email">Password</label>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} className='ml-1 w-[400px] mb-3 bg-white text-black px-4 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div className='mt-1'>
          <label class="block text-white mb-3" for="email">Profile Picture</label>
          <input type="file" onChange={(e)=>setPassword(e.target.value)} className='ml-1 w-[400px] mb-3 bg-white text-black px-4 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <div className='mt-1'>
          <label class="block text-white mb-3" for="email">Resume</label>
          <input type="file" className='ml-1 w-[400px] mb-3 bg-white text-black px-4 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
        </form>
      </div>
      </div>
    </div>
  )
}
