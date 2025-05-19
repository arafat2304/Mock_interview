import React from 'react'

const Agent = () => {
  return (
    <div className='flex sm:flex-row flex-col gap-10 items-center justify-between w-full bg-gray-500'>
        <div className='flex-center flex-col gap-2 p-7 h-[400px] blue-gradient-dark rounded-lg border-3 border-yellow-200/50 flex-1 sm:basis-1/2 w-full'>
            <div className='z-10 flex items-center justify-center blue-gradient rounded-full size-[120px] relative'>
                <img src="ai-avatar.png" alt="AI Avatar" className='w-[65px] h-[54px] object-cover text-center' />
            </div>

        </div>
    </div>
  )
}

export default Agent;