import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/', domain: 'localhost' });
  const uid = cookies.get('uid');

  useEffect(() => {
    if (!uid) {
      navigate('/');
    }
  }, [uid]);

  return (
    <header>
      <div className="header-content">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </header>
  );
};
