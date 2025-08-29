import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [{ data }] = useMeQuery();

  if (!data?.me.username) {
    navigate('/');
  }

  return (
    <Layout>
      <div className="content">Dashboard</div>
    </Layout>
  );
};
