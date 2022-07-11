import { createRoot } from 'react-dom/client';
import React from 'react';
import {
  RecoilRoot,
} from 'recoil';

import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = function WhateverStupidName() {
  return (
    <RecoilRoot>
      <div>
        <h1>Hello World!!</h1>
        <Overview />
        <RelatedItems />
        <Reviews />
        <QuestionsAndAnswers />
      </div>
    </RecoilRoot>
  );
};

root.render(<App />);
