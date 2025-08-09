import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/', domain: 'localhost' });
  const uid = cookies.get('uid');

  useEffect(() => {
    if (!uid) {
      navigate('/');
    }
  }, [uid]);

  return <div>Dashboard</div>;
};
