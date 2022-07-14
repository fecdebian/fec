/** @jsx jsx */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle } from './overviewAtoms';

function StyleThumbnail({ styleThumb }) {
  const [currentStyle, setCurrentStyle] = useRecoilState(selectedProductStyle);
  const photoURL = styleThumb.photos[0].thumbnail_url;

  return (

    <img alt={styleThumb.name} src={photoURL} width="50" height="50" onClick={() => {setCurrentStyle(styleThumb)}} />

  );
}

// StyleThumbnail.propTypes = {
//   styleThumb: PropTypes.object
// };

export default StyleThumbnail;
