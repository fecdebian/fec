import React from 'react';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './categoryAndTitle';

function Overview() {
  return (
    <div>
      <ReviewWeightedAverage />
      <CatAndTitle />
    </div>
  );
}

export default Overview;
