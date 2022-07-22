import React from 'react';
import styled from '@emotion/styled';

import AvgStars from './AvgStars';
import ProductImage from './ProductImage';

export default function withCard(WrappedActionButtonComponent, {
  selectedProduct,
  mainProduct,
  deleteOutfitHandler,
}) {
  function WithCard() {
    return (
      <>
        <ProductImage currentProduct={selectedProduct} />
        <WrappedActionButtonComponent
          selectedProduct={selectedProduct}
          mainProduct={mainProduct}
          deleteOutfitHandler={deleteOutfitHandler}
        />
        <StyledProductDescribtion>{selectedProduct.category}</StyledProductDescribtion>
        <StyledProductDescribtion>{selectedProduct.name}</StyledProductDescribtion>
        <AvgStars currentProduct={selectedProduct} />
        <StyledPrice>
          $
          {selectedProduct.default_price}
        </StyledPrice>
      </>
    );
  }

  const wrappedComponentName = WrappedActionButtonComponent.displayName
    || WrappedActionButtonComponent.name
    || 'Component';
  WithCard.displayName = `withCard(${wrappedComponentName})`;

  return WithCard;
}

/* ===========    CSS Styled Components   =========== */
const StyledPrice = styled.div`
  color:#B12704;
  font-size: 20px;
  font-weight: bold;
`;

const StyledProductDescribtion = styled.div`
  color:#007185;
  font-weight: bold;
`;
