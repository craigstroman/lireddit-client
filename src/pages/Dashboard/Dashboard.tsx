import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, usePostsQuery, useDeletePostMutation } from '../../generated/graphql';
import { UpdootSection } from '../../components/UpdootSection/UpdootSection';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [deleteError, setDeleteError] = useState<string>('');
  const [deleteId, setDeleteId] = useState<number>(0);
  const [{ data: posts, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data, fetching: meLoading }] = useMeQuery();
  const navigate = useNavigate();
  const [, deletePost] = useDeletePostMutation();

  const handleDelete = async (id: number) => {
    const result = await deletePost({ id });
    if (result.error) {
      if (result.error.message) {
        setDeleteError('Not authorized');
        setDeleteId(id);
      }
    }
  };

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
                <div className="post-delete-button">
                  <button type="button" className="delete-button" onClick={() => handleDelete(el.id)}>
                    <FontAwesomeIcon icon={faTrash} className="icon" aria-label="Delete Post" />
                  </button>
                  {deleteError && el.id === deleteId && <div className="delete-error">{deleteError}</div>}
                </div>
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
