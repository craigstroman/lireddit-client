import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, usePostsQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data: posts, fetching: loading }] = usePostsQuery({
    variables,
  });
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching) {
      if (!data?.me.username) {
        navigate('/');
      }
    }
  }, [data, fetching]);

  if (loading) {
    return (
      <Layout>
        <div className="content">
          <h1>Dashboard</h1>
          <div className="create-post-link">
            <a href="/create-post">Create a post</a>
          </div>
          <div className="spinner-border"></div>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content">
        <h1>Dashboard</h1>
        <div className="create-post-link">
          <a href="/create-post">Create a post</a>
        </div>
        {posts &&
          posts.posts.posts.map((el: any) => (
            <div className="card" key={el.id}>
              <h5 className="card-title">{el.title}</h5>
              <p className="card-text">{el.textSnippet}</p>
            </div>
          ))}
        <div className="button">
          {posts && posts.posts.hasMore && (
            <button
              type="button"
              className="load-more-button"
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: posts?.posts.posts[posts?.posts.posts.length - 1].createdAt || '',
                });
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
