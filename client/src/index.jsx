import { createRoot } from 'react-dom/client';
import React from 'react';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = function WhateverStupidName() {
  return (
    <div>
      <h1>Hello World!!</h1>
      <Overview />
      <RelatedItems />
      <Reviews />
    </div>
  );
};

root.render(<App />);
