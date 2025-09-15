import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, cacheExchange, fetchExchange, dedupExchange, Exchange } from 'urql';
import { pipe, tap } from 'wonka';
import { Main } from './pages/Main/Main';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

// TODO: Continue trying to figure out how to return a object for cacheExchange to create a new client because that's how Adam does it in the tutorial he just returns an object for the client

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
  exchanges: [dedupExchange, cacheExchange, debugExchange, fetchExchange],
});

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
