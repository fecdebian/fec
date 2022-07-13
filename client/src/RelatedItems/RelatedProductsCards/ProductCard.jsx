import React from 'react';
import PropTypes from 'prop-types';
import AvgStars from './AvgStars';

export default function ProductsCard({ product }) {
  // console.log('product ', product);
  return (
    <>
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>
        $
        {product.default_price}
      </div>
      <div>{product.id}</div>
      <AvgStars currentProduct={product} />
    </>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
};
