import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, usePostsQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [{ data }] = useMeQuery();
  const [{ data: posts }] = usePostsQuery();

  if (!data?.me.username) {
    navigate('/');
  }

  return (
    <Layout>
      <div className="content">
        <h1>Dashboard</h1>
        {posts && posts.posts.map((el) => <div key={el.id}>{el.title}</div>)}
      </div>
    </Layout>
  );
};
