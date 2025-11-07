import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, usePostsQuery } from '../../generated/graphql';
import { UpdootSection } from '../../components/UpdootSection/UpdootSection';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: posts, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data, fetching: meLoading }] = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!meLoading) {
      if (data && data.me && !data?.me.username) {
        navigate('/');
      }
    }
  }, [data, meLoading]);

  if (fetching) {
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
            <div className="post-container" key={el.id}>
              <div className="vote-container">
                <UpdootSection post={el} />
              </div>
              <div className="post-content">
                <div className="post-title">
                  <a className="post-link" href={`/post/${el.id}`}>
                    {el.title}
                  </a>
                </div>
                Posted by {el.creator.username}
                <p className="post-text">{el.textSnippet}</p>
              </div>
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
                  cursor: posts.posts.posts[posts.posts.posts.length - 1].createdAt,
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
