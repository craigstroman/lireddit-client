import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { usePostQuery } from '../../generated/graphql';

export const Post: React.FC = () => {
  const { id } = useParams();
  let idParam = null;

  if (id) {
    idParam = parseFloat(id);
  }

  const [{ data, error, fetching }] = usePostQuery({
    pause: idParam === -1,
    variables: {
      id: idParam ? idParam : 0,
    },
  });

  if (fetching) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div>{error.message}</div>
      </Layout>
    );
  }

  if (data && !data.post) {
    return (
      <Layout>
        <div>Couldn't find the post.</div>
      </Layout>
    );
  }

  if (data && data.post) {
    return (
      <Layout>
        <h1>{data.post.title}</h1>
        <div>{data.post.text}</div>
      </Layout>
    );
  }
};
