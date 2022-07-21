import { createRoot } from 'react-dom/client';
import React from 'react';
import { RecoilRoot } from 'recoil';

import ProductDetailPage from './ProductDetailPage';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = function WhateverStupidName() {
  return (
    <RecoilRoot>
      <ProductDetailPage />
    </RecoilRoot>
  );
};

root.render(<App />);
