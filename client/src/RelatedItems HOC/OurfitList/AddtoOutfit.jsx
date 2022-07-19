/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';

export default function AddToOutfit() {
  return (
    <div>
      <button
        type="button"
        css={css`
          font-size: 11rem;
        `}
      >
        &#43;
      </button>
      <span>Add to Outfit</span>
    </div>
  );
}

AddToOutfit.propTypes = {
  currentProductDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
