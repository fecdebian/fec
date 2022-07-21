/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import withCard from '../HOC/WithCard';
import AddToOutfit from './AddtoOutfit';
import DeleteButton from './DeleteButton';

export default function Outfit({ currentProductDetail }) {
  const [outfits, setOutfits] = useState({});
  const AddToOutfitHandler = () => {
    // localStorage.clear();

    if (localStorage.getItem('outfits') === null) {
      const tmpOutfit = {};
      tmpOutfit[currentProductDetail.id] = currentProductDetail;
      const outfitString = JSON.stringify(tmpOutfit);
      localStorage.setItem('outfits', outfitString);
      setOutfits(tmpOutfit);
    } else {
      const tmpOutfitString = localStorage.getItem('outfits');
      const tmpOutfit = JSON.parse(tmpOutfitString);
      tmpOutfit[currentProductDetail.id] = currentProductDetail;
      const outfitString = JSON.stringify(tmpOutfit);
      localStorage.setItem('outfits', outfitString);
      setOutfits(tmpOutfit);
    }
  };

  const deleteOutfitHandler = (OutfitList) => {
    setOutfits(OutfitList);
  };

  useEffect(() => {
    const tmpOutfitString = localStorage.getItem('outfits');
    if (tmpOutfitString !== null) {
      const tmpOutfit = JSON.parse(tmpOutfitString);
      setOutfits(tmpOutfit);
    }
  }, []);

  return (
    <>
      <AddToOutfit
        AddToOutfitHandler={AddToOutfitHandler}
        currentProductDetail={currentProductDetail}
      />
      {Object
        .keys(outfits)
        .map((key) => {
          const selectedProduct = outfits[key];
          const OutfitCard = withCard(DeleteButton, { selectedProduct, deleteOutfitHandler });
          return (
            <StyledOutfitCardDiv key={selectedProduct.id}>
              <OutfitCard />
            </StyledOutfitCardDiv>
          );
        })}
    </>
  );
}

Outfit.propTypes = {
  currentProductDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

/* ===========    CSS Styled Components   =========== */
const StyledOutfitCardDiv = styled.div`
  flex: 0 0 160;
  border-sizing: border-box;
  width:160;
  padding:0.25rem;
  position:relative;`;
