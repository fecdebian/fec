import React from 'react';
import {
  useRecoilValue,
} from 'recoil';

import ReviewWeightedAverage from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import StylePrice from './StylePrice';
import StyleList from './StyleList';
import ProductOverview from './ProductOverview';
import currentProductState from '../currentProduct';
import { selectedProductStyle, currentProductStyles } from './overviewAtoms';

function Overview() {
  const product = useRecoilValue(currentProductState);
  const style = useRecoilValue(selectedProductStyle);
  const allStyles = useRecoilValue(currentProductStyles);
  return (
    <div>
      <ReviewWeightedAverage currentProduct={product} />
      <CatAndTitle />
      <StylePrice currentProduct={product} currentStyle={style} />
      <StyleList productStyles={allStyles} />
      <ProductOverview slogan={product.slogan} description={product.description} />
    </div>
  );
}

export default Overview;
