import React from 'react';
import { useRecoilValue } from 'recoil';

import currentProductState from '../currentProduct';

function ProductOverview() {
  const product = useRecoilValue(currentProductState);
  const slogan = product.slogan;
  const description = product.description;
  return (
    <div>
      <h2>{slogan}</h2>
      <h3>{description}</h3>
    </div>
  );
}

export default ProductOverview;
