/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import ImageThumbnail from './GalleryThumbs';
import { selectedProductStyle, selectedImage } from './overviewAtoms';

function GalleryDefault() {
  const currentStyle = useRecoilValue(selectedProductStyle);
  const currentImage = useRecoilValue(selectedImage);
  const imageList = currentStyle.photos;

  if (currentStyle.name === undefined) {
    return <div>Styles Loading...</div>;
  }
  let keys = 0;
  return (
    <div>
      <img
        alt={currentImage}
        src={currentImage}
        width="500"
        height="500"
        css={css`
        position: absolute;
        z-index: 0;
      `}
      />

        {imageList.map((imageObj) =>
          <ImageThumbnail image={imageObj} key={keys++} />)}

    </div>
  );
}

export default GalleryDefault;
