import React from 'react';
import { useRecoilValue } from 'recoil';

import Stars from '../SharedComponents/ReviewStars';
import currentProductState from '../currentProduct';

function Overview() {
  const product = useRecoilValue(currentProductState);
  const productID = product.id;
  return (
    <div>
      Overview Placeholder
      {Stars(productID)}
    </div>
  );
}

export default Overview;
