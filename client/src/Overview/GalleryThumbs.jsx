/** @jsx jsx */
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import { selectedImage, selectedImageIndex } from './overviewAtoms';

function ImageThumbnail({ image, imageIndex }) {
  const [currentImage, setCurrentImage] = useRecoilState(selectedImage);
  const [currentImageIndex, setCurrentImageIndex] = useRecoilState(selectedImageIndex);

  const clickThumbHandler = (e) => {
    e.preventDefault();
    setCurrentImage(image.url);
    setCurrentImageIndex(imageIndex);
  };

  if (image.url === currentImage) {
    return (
      <li>
        <img
          alt={imageIndex}
          src={image.thumbnail_url} width="50"
          height="50"
          css={css`
          position: relative;
          border: solid 1px blue;
          z-index: 1;
          `}
          onClick={clickThumbHandler}
        />
      </li>
    );
  }

  return (
    <li>
      <img
        alt={imageIndex}
        src={image.thumbnail_url} width="50"
        height="50"
        css={css`
        position: relative;
        z-index: 1;
        `}
        onClick={clickThumbHandler}
      />
    </li>
  );
}

// StyleThumbnail.propTypes = {
//   styleThumb: PropTypes.object
// };

export default ImageThumbnail;
