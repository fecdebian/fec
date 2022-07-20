/** @jsx jsx */
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

import { selectedImage } from './overviewAtoms';

function ImageThumbnail({ image }) {
  const [currentImage, setCurrentImage] = useRecoilState(selectedImage);

  if (image.url === currentImage) {
    return (
      <li>
        <img
          alt={image.thumbnail_url}
          src={image.thumbnail_url} width="50"
          height="50"
          css={css`
          position: relative;
          border: solid 1px blue;
          z-index: 1;
          `}
          onClick={() => {setCurrentImage(image.url)}}
        />
      </li>
    );
  }

  return (
    <li>
      <img
        alt={image.thumbnail_url}
        src={image.thumbnail_url} width="50"
        height="50"
        css={css`
        position: relative;
        z-index: 1;
        `}
        onClick={() => {setCurrentImage(image.url)}}
      />
    </li>
  );

  // return (
  //   <span>
  //     <img
  //       alt={styleThumb.name} src={photoURL} width="50" height="50"
  //       onClick={() => {setCurrentStyle(styleThumb)}}
  //     />
  //   </span>
  // );
}

// StyleThumbnail.propTypes = {
//   styleThumb: PropTypes.object
// };

export default ImageThumbnail;
