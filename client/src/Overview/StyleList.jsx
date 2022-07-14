/** @jsx jsx */
import React from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import StyleThumbnail from './StyleThumbnail';
import { selectedProductStyle, currentProductStyles } from './overviewAtoms';

function StyleList({ productStyles }) {
  const currentStyle = useRecoilValue(selectedProductStyle);

  if (productStyles[0] === undefined) {
    return <div>Styles Loading...</div>;
  }

  return (
    <div>
      <span>
        {currentStyle.name}
      </span>
      <ul>
        {productStyles.map((style) => <StyleThumbnail key={style.style_id} styleThumb={style} />)}
      </ul>
    </div>
  );
}

// StyleList.propTypes = {
//   productStyles: PropTypes.array
// };

export default StyleList;
