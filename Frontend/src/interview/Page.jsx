import React, { useEffect, useState } from 'react';
import Agent from './Agent';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
    } else {
      setAuthChecked(true); // ✅ allow rendering Agent only if token exists
    }
  }, [navigate]);

  if (!authChecked) {
    return <p className='text-white'>Checking authentication...</p>;
  }

  return (
    <div className='bg-black min-h-screen px-6 pt-16'>
      <h3 className='text-white font-bold'>Interview Generation</h3>
      <Agent />
    </div>
  );
};

export default Page;
