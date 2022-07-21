/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';

import ImageThumbnail from './GalleryThumbs';
import { selectedProductStyle, selectedImage, selectedImageIndex } from './overviewAtoms';

function GalleryDefault() {
  const currentStyle = useRecoilValue(selectedProductStyle);
  const [currentImage, setCurrentImage] = useRecoilState(selectedImage);
  const [imageIndex, setImageIndex] = useRecoilState(selectedImageIndex);
  const imageList = currentStyle.photos;

  if (currentStyle.name === undefined) {
    return <div>Styles Loading...</div>;
  }

  const previousPhotoHandler = (e) => {
    e.preventDefault();
    const photoIndex = imageIndex;
    if (photoIndex === 0) {
      return;
    }
    setCurrentImage(imageList[photoIndex - 1].url);
    setImageIndex(photoIndex - 1);
  };

  const nextPhotoHandler = (e) => {
    e.preventDefault();
    const photoIndex = imageIndex;
    if (photoIndex === imageList.length - 1) {
      return;
    }
    setCurrentImage(imageList[photoIndex + 1].url);
    setImageIndex(photoIndex + 1);
  };

  return (
    <div
      css={css`
          display: grid;
          grid-column-start: 1;
          grid-column-end: 3;
        `}
    >
      <i
        className="fa-solid fa-arrow-left"
        type="button"
        onClick={previousPhotoHandler}
        css={css`
          z-index:5;
          display: grid;
          color: black;
          background-color: transparent;
          border: none;
          font-size: 3rem;
        `}
      />
      <img
        alt={currentImage}
        src={currentImage}
        width="500"
        height="500"
        css={css`
        position: absolute;
        display: grid;
        z-index: 0;
      `}
      />
      <i
        className="fa-solid fa-arrow-right"
        type="button"
        onClick={nextPhotoHandler}
        css={css`
          z-index:5;
          display: grid;
          color: black;
          background-color: transparent;
          border: none;
          font-size: 3rem;
      `}
      />

      <div
        css={css`
          display: grid;
          grid-auto-rows: 50px;
        `}
      >
        <i
        className="fa-solid fa-arrow-up"
        type="button"
        onClick={previousPhotoHandler}
        css={css`
          z-index:5;
          display: grid;
          color: black;
          background-color: transparent;
          font-size:1rem;
        `}
      />
        {imageList.map((imageObj, index) => <ImageThumbnail image={imageObj} key={index} imageIndex={index} />)}
      </div>
      <i
        className="fa-solid fa-arrow-down"
        type="button"
        onClick={nextPhotoHandler}
        css={css`
          z-index:5;
          display: grid;
          color: black;
          background-color: transparent;
          font-size:1rem;
      `}
      />

    </div>
  );
}

export default GalleryDefault;