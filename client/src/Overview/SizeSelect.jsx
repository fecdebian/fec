/** @jsx jsx */
import { useRecoilValue, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import StyleThumbnail from './StyleThumbnail';
import { selectedProductStyle } from './overviewAtoms';

function SizeSelect() {
  const currentStyle = useRecoilValue(selectedProductStyle);
  const [allSizes, setAllSizes] = useRecoilState(selectedProductSizes);

  if (currentStyle.style_id === undefined) {
    return <div>Sizes Loading...</div>;
  }

  const styleSKUs = Object.keys(currentStyle.skus);
  const styleSizes = [];
  for (let i = 0; i < styleSKUs.length; i += 1) {
    if (styleSKUs[i].quantity > 0) {
     styleSizes.push({styleSKUs[i].size: styleSKUs[i].quantity})
    }
  }

  return (
    <div>
      <span>
        {currentStyle.name}
      </span>
    </div>
  );
}

// SizeSelect.propTypes = {
//   productStyles: PropTypes.array
// };

export default SizeSelect;
