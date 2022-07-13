import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsCard({ product }) {
  return (
    <>
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>
        $
        {product.default_price}
      </div>
    </>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
};
