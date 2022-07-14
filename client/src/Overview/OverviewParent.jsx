import React from 'react';
import {
  useRecoilValue,
} from 'recoil';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import StylePrice from './StylePrice';
import ProductOverview from './ProductOverview';
import currentProductState from '../currentProduct';
import { selectedProductStyle } from './overviewAtoms';

function Overview() {
  const product = useRecoilValue(currentProductState);
  const style = useRecoilValue(selectedProductStyle);
  return (
    <div>
      <ReviewWeightedAverage currentProduct={product} />
      <CatAndTitle />
      <StylePrice currentProduct={product} currentStyle={style} />
      <ProductOverview slogan={product.slogan} description={product.description} />
    </div>
  );
}

export default Overview;
