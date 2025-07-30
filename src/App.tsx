import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './pages/Main/Main';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
