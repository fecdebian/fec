/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeleteButton({ selectedProduct, deleteOutfitHandler }) {
  const removeOutFitCardHandler = () => {
    console.log('Delete button', selectedProduct);
    let tmpOutfitString = localStorage.getItem('outfits');
    // console.log('add to outfit', localStorage.getItem('outfits'));
    if (tmpOutfitString !== null) {
      const tmpOutfit = JSON.parse(tmpOutfitString);
      // console.log('add to outfit', tmpOutfit);
      delete tmpOutfit[selectedProduct.id];
      tmpOutfitString = JSON.stringify(tmpOutfit);
      localStorage.setItem('outfits', tmpOutfitString);
      // setOutfits(tmpOutfit);
      deleteOutfitHandler(tmpOutfit);
    }
  };

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
  deleteOutfitHandler: PropTypes.func.isRequired,
};
