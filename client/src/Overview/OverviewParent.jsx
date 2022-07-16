import React from 'react';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import StylePrice from './StylePrice';
import StyleList from './StyleList';
import SizeSelect from './SizeSelect';
import ProductOverview from './ProductOverview';

function Overview() {
  return (
    <div>
      <ReviewWeightedAverage />
      <CatAndTitle />
      <StylePrice />
      <StyleList />
      <SizeSelect />
      <ProductOverview />
    </div>
  );
}

export default Overview;
