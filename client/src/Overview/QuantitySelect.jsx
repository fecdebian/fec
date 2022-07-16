/** @jsx jsx */
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import StyleThumbnail from './StyleThumbnail';
import { selectedProductStyle } from './overviewAtoms';

function QuantitySelect() {
  const currentStyle = useRecoilValue(selectedProductStyle);

  if (currentStyle.style_id === undefined) {
    return <div>Styles Loading...</div>;
  }

  return (
    <div>
      <span>
        {currentStyle.name}
      </span>

    </div>
  );
}

// QuantitySelect.propTypes = {
//   productStyles: PropTypes.array
// };

export default QuantitySelect;
