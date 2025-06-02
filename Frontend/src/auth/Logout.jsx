import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout =()=>{

    const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  },[]);

  return (
    <>
         <p>Logout</p>
    </>
  )
}
