import React from 'react';
import {
  useRecoilValue,
} from 'recoil';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import currentProductState from '../currentProduct';
import StylePrice from './StylePrice';
import { selectedProductStyle } from './overviewAtoms';

function Overview() {
  const product = useRecoilValue(currentProductState);
  const style = useRecoilValue(selectedProductStyle);
  return (
    <div>
      <ReviewWeightedAverage currentProduct={product} />
      <CatAndTitle />
      <StylePrice currentProduct={product} currentStyle={style} />
    </div>
  );
}

export default Overview;
