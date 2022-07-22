/** @jsx jsx */
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle, selectedImage } from './overviewAtoms';

function StyleThumbnail({ styleThumb }) {
  const [currentStyle, setCurrentStyle] = useRecoilState(selectedProductStyle);
  const [currentImage, setCurrentImage] = useRecoilState(selectedImage);
  const photoURL = styleThumb.photos[0].thumbnail_url;
  const fullPhotoURL = styleThumb.photos[0].url;

  const clickHandler = (e) => {
    e.preventDefault();
    setCurrentStyle(styleThumb);
    setCurrentImage(fullPhotoURL);
  };

  if (styleThumb.style_id === currentStyle.style_id) {
    return (
      <div>
        <i
          className="fa-solid fa-check"
          css={css`
          position: absolute;
          z-index: 1;
          `}
        />
        <img
          alt={styleThumb.name} src={photoURL} width= "65" height= "65"
          onClick={clickHandler}
        />
      </div>
    );
  }
  return (
    <div>
      <img
        alt={styleThumb.name} src={photoURL} width= "65" height= "65"
        onClick={() => {setCurrentStyle(styleThumb)}}
      />
    </div>
  );
}

// StyleThumbnail.propTypes = {
//   styleThumb: PropTypes.object
// };

export default StyleThumbnail;
