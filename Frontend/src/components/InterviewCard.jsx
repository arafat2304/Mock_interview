import React from 'react';
import dayjs from "dayjs";
import { getRandomInterviewCover } from '../../utils';

const InterviewCard = ({data}) => {

    const formattedDate =dayjs(data.createdAt || Date.now()).format('MMM D, YYYY');

  return (
    <div className='w-[360px] border-gradient p-0.5 rounded-2xl mt-5  bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]  max-sm:w-full min-h-50'>
        <div>
            <div className=''>
                <div className='relative top-0nright-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'><p className='text-white bg-black'>{data.type}</p></div>
                <img src={getRandomInterviewCover()}/>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard