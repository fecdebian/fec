import React from 'react';

import AvgStars from './AvgStars';
import ProductImage from './ProductImage';

export default function withCard(WrappedActionButtonComponent, { selectedProduct, mainProduct }) {
  function WithCard() {
    return (
      <>
        <ProductImage currentProduct={selectedProduct} />
        <WrappedActionButtonComponent selectedProduct={selectedProduct} mainProduct={mainProduct} />
        <div>{selectedProduct.category}</div>
        <div>{selectedProduct.name}</div>
        <AvgStars currentProduct={selectedProduct} />
        <div>
          $
          {selectedProduct.default_price}
        </div>
      </>
    );
  }

  const wrappedComponentName = WrappedActionButtonComponent.displayName
    || WrappedActionButtonComponent.name
    || 'Component';
  WithCard.displayName = `withCard(${wrappedComponentName})`;

  return WithCard;
}
