import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, usePostsQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [{ data: posts }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  const [{ data, fetching }] = useMeQuery({ requestPolicy: 'network-only' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching) {
      if (!data?.me.username) {
        navigate('/');
      }
    }
  }, [data, fetching]);

  return (
    <Layout>
      <div className="content">
        <h1>Dashboard</h1>
        <div className="create-post-link">
          <a href="/create-post">Create a post</a>
        </div>
        {posts &&
          posts.posts.map((el: any) => (
            <div className="card">
              <h5 className="card-title">{el.title}</h5>
              <p className="card-text">{el.textSnippet}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};
