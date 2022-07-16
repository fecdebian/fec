/** @jsx jsx */
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle } from './overviewAtoms';

function StyleThumbnail({ styleThumb }) {
  const [currentStyle, setCurrentStyle] = useRecoilState(selectedProductStyle);
  const photoURL = styleThumb.photos[0].thumbnail_url;

  if (styleThumb.style_id === currentStyle.style_id) {
    return (
      <span>
        <i
          className="fa-solid fa-check"
          css={css`
          position: absolute;
          z-index: 1;
          `}
        />
        <img
          alt={styleThumb.name} src={photoURL} width="50" height="50"
          onClick={() => {setCurrentStyle(styleThumb)}}
        />
      </span>
    );
  }
  return (
    <span>
      <img
        alt={styleThumb.name} src={photoURL} width="50" height="50"
        onClick={() => {setCurrentStyle(styleThumb)}}
      />
    </span>
  );
}

// StyleThumbnail.propTypes = {
//   styleThumb: PropTypes.object
// };

export default StyleThumbnail;
