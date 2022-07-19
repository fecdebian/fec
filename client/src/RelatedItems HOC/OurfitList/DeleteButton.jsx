/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeleteButton({ selectedProduct }) {
  const removeOutFitCardHandler = () => {
    console.log(selectedProduct);
  }

  return (
    <button
      onClick={removeOutFitCardHandler}
      type="button"
      css={css`
        position:absolute;
        color:black;
        background-color:white ;
        border:solid;
        right:2%;
        font-size:1rem;
        font-weight:bold;
      `}
    >
      <span>&#10006;</span>
    </button>
  );
}

DeleteButton.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
