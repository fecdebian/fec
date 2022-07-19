/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withCard from '../HOC/WithCard';
import AddToOutfit from './AddtoOutfit';

export default function Outfit({ currentProductDetail }) {
  const [outfits, setOutfits] = useState({});
  const AddToOutfitHandler = (e) => {
    // if (localStorage.getItem('outfits') !== undefined) {
    //   const outfitsCopy = { ...outfits };
    //   outfitsCopy[currentProductDetail.id] = currentProductDetail;
    //   localStorage.setItem('outfits', outfits);
    // } else {
    //   outfits = localStorage.getItem('outfits');
    //   if (outfits[currentProductDetail.id] !== undefined) {
    //     outfits[currentProductDetail.id] = currentProductDetail;
    //     localStorage.setItem('outfits', outfits);
    //   }
    // }
    // // localStorage.clear();
    console.log('add to outfit', localStorage);

    if (localStorage.getItem('outfits') === undefined) {
    } else {

    }

  };

  return (
    <>
      <AddToOutfit
        onClick={AddToOutfitHandler}
        currentProductDetail={currentProductDetail}
      />
    </>
  );
}

Outfit.propTypes = {
  currentProductDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
