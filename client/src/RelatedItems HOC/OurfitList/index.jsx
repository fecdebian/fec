/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import withCard from '../HOC/WithCard';
import AddToOutfit from './AddtoOutfit';
import DeleteButton from './DeleteButton';

function Holder() {
  return <span>holder</span>;
}

export default function Outfit({ currentProductDetail }) {
  const [outfits, setOutfits] = useState({});
  const AddToOutfitHandler = () => {
    localStorage.clear();
    // console.log('add to outfit', localStorage.getItem('outfits'));

    if (localStorage.getItem('outfits') === null) {
      const tmpOutfit = {};
      tmpOutfit[currentProductDetail.id] = currentProductDetail;
      const outfitString = JSON.stringify(tmpOutfit);
      localStorage.setItem('outfits', outfitString);
    } else {
      const tmpOutfitString = localStorage.getItem('outfits');
      const tmpOutfit = JSON.parse(tmpOutfitString);
      tmpOutfit[currentProductDetail.id] = currentProductDetail;
      localStorage.setItem('outfits', tmpOutfit);
    }

    // console.log('add to outfit', localStorage.getItem('outfits'));
  };

  useEffect(() => {
    const tmpOutfitString = localStorage.getItem('outfits');
    // console.log('add to outfit', localStorage.getItem('outfits'));
    if (tmpOutfitString !== null) {
      const tmpOutfit = JSON.parse(tmpOutfitString);
      // console.log('add to outfit', tmpOutfit);
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
          const OutfitCard = withCard(DeleteButton, { selectedProduct });
          return (
            <div
              key={selectedProduct.id}
              css={css`
                flex: 0 0 14%;
                border-sizing: border-box;
                width:14%;
                padding:0.25rem;
                position:relative;
              `}
            >
              <OutfitCard />
            </div>
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
