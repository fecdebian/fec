/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function AddToOutfit({ AddToOutfitHandler }) {
  return (
    <div>
      <button
        type="button"
        onClick={AddToOutfitHandler}
        css={css`
          font-size: 10rem;
        `}
      >
        &#43;
      </button>
      <div>Add to Outfit</div>
    </div>
  );
}

AddToOutfit.propTypes = {
  currentProductDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  AddToOutfitHandler: PropTypes.func.isRequired,
};
