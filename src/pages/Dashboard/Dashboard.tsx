import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';
import { NavBar } from '../../components/NavBar/NavBar.';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [{ data }] = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.me?.username) {
      navigate('/');
    }
  }, [data]);

  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="content">Dashboard</div>
    </div>
  );
};
