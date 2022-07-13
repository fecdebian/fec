import React from 'react';
import {
  useRecoilValue,
} from 'recoil';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import currentProductState from '../currentProduct';
import StylePrice from './StylePrice';

function Overview() {
  const product = useRecoilValue(currentProductState);
  return (
    <div>
      <ReviewWeightedAverage currentProduct={product} />
      <CatAndTitle />
      <StylePrice currentProduct={product} />
    </div>
  );
}

export default Overview;
