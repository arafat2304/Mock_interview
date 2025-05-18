import React from 'react';
import dayjs from "dayjs";
import { getRandomInterviewCover } from '../../utils';

const InterviewCard = ({data}) => {

    const formattedDate =dayjs(data.createdAt || Date.now()).format('MMM D, YYYY');

  return (
    <div className='relative w-[360px] border-gradient p-0.5 rounded-2xl mt-5  bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]  max-sm:w-full min-h-50'>
        <div>
            <div className=''>
                <div className='top-0 right-0 w-fit px-4  rounded-bl-lg'><p className='text-white bg-blue-500 p-1 rounded-lg ml-60 lg:ml-67'>{data.type}</p></div>
                <img className='rounded-full h-[80px] w-[80px] object-fit ml-5' src={getRandomInterviewCover()}/>
                <h3 className='text-white mt-2 font-bold text-xl'>{data.role} Interview</h3>
                <div className='flex flex-row gap-5 mt-3'>
                  <div className='flex flex-row gap-2'> 
                    <img src="/calendar.svg"/><p className='text-white'>{formattedDate}</p>
                    <p className=''><img src="/star.svg"/></p>
                     <p className='text-white'>{data?.totalScore || '---'}/100</p>
                  </div>
                </div>
                <div className='flex flex-row gap-2 mt-2'>
                    <p className='text-white'>{data?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills."}</p>
                  </div>
                 <div className='flex flex-row justify-between mt-3 pb-5'>
                    <p className=' text-white'>{data.techstack[0]+", "+data.techstack[1]+" etc..."}</p>
                    <button className='text-white  bg-blue-600 py-2 px-5 rounded-3xl'>View Interview</button>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard