import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout =()=>{

    const navigate = useNavigate();
    useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/home');
  },[]);

  return (
    <>
         <p>Logout</p>
    </>
  )
}
