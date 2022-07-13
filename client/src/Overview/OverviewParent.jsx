import React from 'react';
import {
  useRecoilValue,
} from 'recoil';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import currentProductState from '../currentProduct';

function Overview() {
  const product = useRecoilValue(currentProductState);
  return (
    <div>
      <ReviewWeightedAverage currentProduct={product} />
      <CatAndTitle />
    </div>
  );
}

export default Overview;
