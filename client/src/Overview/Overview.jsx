import React from 'react';
import { useRecoilValue } from 'recoil';

import Stars from '../SharedComponents/ReviewStars';
import currentProductState from '../currentProduct';

function Overview() {
  // const product = useRecoilValue(currentProductState);
  // const productID = product.id;
  // console.log('Overview Product ID: ', productID, 'currentProductState: ', currentProductState);
  return (
    <div>
      Overview Placeholder
      {/* {Stars} */}
      <Stars />
    </div>
  );
}

export default Overview;
