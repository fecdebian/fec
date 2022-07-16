/** @jsx jsx */
import { useRecoilValue } from 'recoil';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle, currentProductStyles } from './overviewAtoms';

function SizeSelect() {
  const currentProductStyleshere = useRecoilValue(currentProductStyles);
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  let sizesList = [];
  console.log('currentproductstyles:', currentProductStyleshere);

  if (currentProductStyle.style_id === undefined) {
    return <div>Sizes Loading...</div>;
  }

  const styleSKUs = Object.values(currentProductStyle.skus);
  const styleSizes = [];
  for (let i = 0; i < styleSKUs.length; i += 1) {
    if (styleSKUs[i].quantity > 0) {
      const currentSize = styleSKUs[i].size;
      const currentQuant = styleSKUs[i].quantity;
      const sizeAdd = {};
      sizeAdd[currentSize] = currentQuant;
      styleSizes.push(sizeAdd);
    }
  }
  sizesList = styleSizes;
  console.log('allSizes', sizesList);

  return (
    <div>
      <span>
        {currentProductStyle.name}
      </span>
    </div>
  );
}

export default SizeSelect;
