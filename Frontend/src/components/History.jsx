import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const History = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/signIn');
      }
    }, [navigate]);

  return (
    <div>History</div>
  )
}

export default History