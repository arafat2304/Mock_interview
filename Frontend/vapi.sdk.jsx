import React, { useState } from 'react'

    inteface savedMessage{
        role : 'user' | 'system' | 'assistance',
        content:String
    }

function vapisdk() {
    const [message,setMessage]=useState<savedMessage>([])
  return (
    <div>vapi.sdk</div>
  )
}

export default vapi.sdk