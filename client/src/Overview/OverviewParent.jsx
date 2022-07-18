import React from 'react';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import StylePrice from './StylePrice';
import StyleList from './StyleList';
import Cart from './Cart';
import ProductOverview from './ProductOverview';

function Overview() {
  return (
    <div>
      <ReviewWeightedAverage />
      <CatAndTitle />
      <StylePrice />
      <StyleList />
      <Cart />
      <ProductOverview />
    </div>
  );
}

export default Overview;
