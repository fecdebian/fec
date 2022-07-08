import { createRoot } from 'react-dom/client';
import React from 'react';
import Overview from './Overview/Overview.jsx';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = function WhateverStupidName() {
  return (
  <h1>Hello World!!</h1>;
  <Overview/>
  )
};

root.render(<App />);
