import React from 'react';
import { useRecoilState } from 'recoil';

import currentProductState from '../currentProduct';

function CatAndTitle() {
  const currentProduct = useRecoilState(currentProductState);
  console.log('current product', currentProduct);
  const proCat = currentProduct[0].category;
  const proTitle = currentProduct[0].name;

  return (
    <div>
      <h3>{proCat}</h3>
      <h1>{proTitle}</h1>
    </div>
  );
}

export default CatAndTitle;
