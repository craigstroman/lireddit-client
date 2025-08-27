import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { usePostsQuery } from '../../generated/graphql';

export const Index: React.FC = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>{!data ? <div>loading...</div> : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}</Layout>
  );
};
