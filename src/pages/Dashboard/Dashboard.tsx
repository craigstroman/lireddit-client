import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useMeQuery } from '../../generated/graphql';
import { NavBar } from '../../components/NavBar/NavBar.';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  // TODO: Come back to this and use me query if I can get it working instead of looking for cookie to confirm person logged in.
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/', domain: 'localhost' });
  const uid = cookies.get('uid');

  useEffect(() => {
    if (!uid) {
      console.log('navigate: ');
      navigate('/');
    }
  }, [uid]);

  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="content">Dashboard</div>
    </div>
  );
};
