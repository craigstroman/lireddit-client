import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, fetchExchange, Exchange } from 'urql';
// dedupExchange
import { cacheExchange } from '@urql/exchange-graphcache';
import { pipe, tap } from 'wonka';
import { Main } from './pages/Main/Main';
import { invalidateAllPosts } from './shared/utils/invalidateAllPosts';
import { betterUpdateQuery } from './shared/utils/betterUpdateQuery';
import { MeDocument, MeQuery, LogoutMutation } from './generated/graphql';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

const debugExchange: Exchange =
  ({ forward }: any) =>
  (ops$: any) =>
    pipe(
      forward(ops$),
      tap((e) => console.log('[urql]', e)),
    );

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
          createPost: (_result, args, cache, info) => {
            invalidateAllPosts(cache);
          },
          // TODO: Figure out why this I can't set me to null
          // TODO: Figure out how to get logout function working
          // TODO: This is because now I am using latest version of urql
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
              me: null,
            }));
          },
        },
      },
    }),
    debugExchange,
    fetchExchange,
  ],
});

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
