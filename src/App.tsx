import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { Main } from './pages/Main/Main';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

const client = new Client({
  url: 'http://localhost:9000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
