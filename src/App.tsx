import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, fetchExchange, gql } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Main } from './pages/Main/Main';
import { invalidateAllPosts } from './shared/utils/invalidateAllPosts';
import { betterUpdateQuery } from './shared/utils/betterUpdateQuery';
import {
  MeDocument,
  MeQuery,
  LogoutMutation,
  DeletePostMutationVariables,
  RegisterMutation,
  LoginMutation,
  VoteMutationVariables,
} from './generated/graphql';
import { debugExchange } from './shared/utils/debugExchange';
import { error } from './shared/utils/errorExchange';
// dedupExchange

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

// TODO: Figure out how to clear cache on logout function

const client = new Client({
  url: 'http://localhost:9000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      keys: {},
      updates: {
        Mutation: {
          deletePost: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: 'Post',
              id: (args as DeletePostMutationVariables).id,
            });
          },
          vote: (_result, args, cache, info) => {
            const { postId, value } = args as VoteMutationVariables;
            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  id
                  points
                  voteStatus
                }
              `,
              { id: postId } as any,
            );

            if (data) {
              if (data.voteStatus === value) {
                return;
              }
              const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    points
                    voteStatus
                  }
                `,
                { id: postId, points: newPoints, voteStatus: value } as any,
              );
            }
          },
          createPost: (_result, args, cache, info) => {
            const allFields = cache.inspectFields('Query');
            const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
            fieldInfos.forEach((fi) => {
              cache.invalidate('Query', 'posts', fi.arguments || {});
            });
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
              me: null,
            }));
            cache.invalidate('Query', 'Me');
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: any, query: any) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
            invalidateAllPosts(cache);
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: any, query: any) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    debugExchange,
    fetchExchange,
    error,
  ],
});

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
