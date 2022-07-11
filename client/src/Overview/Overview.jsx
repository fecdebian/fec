import React from 'react';
import Stars from '../SharedComponents/ReviewStars';

function Overview() {
  const productID = 37311;
  return (
    <div>
      Overview Placeholder
      {Stars(productID)}
    </div>
  );
}

export default Overview;
