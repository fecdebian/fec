/** @jsx jsx */
import React, { useEffect } from 'react';
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
        { productStyles.map((style) => {return( <StyleThumbnail styleThumb={style} />)}) }
      </ul>
    </div>
  );
}

// StyleList.propTypes = {
//   productStyles: PropTypes.shape({
//     id: PropTypes.number,
//   }).isRequired,
// };

export default StyleList;


