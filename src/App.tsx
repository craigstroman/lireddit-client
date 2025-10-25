import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, fetchExchange, ssrExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import gql from 'graphql-tag';
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
import { cursorPagination } from './shared/utils/cursorPagination';
// dedupExchange

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);
const nodeEnv = process.env.NODE_ENV;
const ssr = ssrExchange({ isClient: false });

const client = new Client({
  url:
    nodeEnv === 'production' ? 'https://lireddit.craigstroman.com/graphql' : 'http://localhost:9000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
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
                  __typename
                  id
                  points
                  title
                  textSnippet
                }
              `,
              { id: postId } as any,
            );

            if (data) {
              const newPoints = (data.points as number) + 1 * value;
              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    __typename
                    points
                    id: postId
                    points: newPoints
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
    ssr,
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
