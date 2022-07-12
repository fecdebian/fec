import React from 'react';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';

function Overview() {
  return (
    <div>
      <ReviewWeightedAverage />
      <CatAndTitle />
    </div>
  );
}

export default Overview;
