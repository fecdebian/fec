import { createRoot } from 'react-dom/client';
import React from 'react';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = function WhateverStupidName() {
  return (
    <div>
      <h1>Hello World!!</h1>
      <Overview />
      <RelatedItems />
    </div>
  );
};

root.render(<App />);