/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AvgStars from './AvgStars';
import ProductImage from './ProductImage';
import Modal from './Modal/Modal';

export default function ProductsCard({ selectedProduct, mainProduct }) {
  const [show, setShow] = useState(false);
  const openModalHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => {
    setShow(false);
  };

  return (
    <>
      <ProductImage currentProduct={selectedProduct} />
      <button
        onClick={openModalHandler}
        type="submit"
        css={css`
          position:absolute;
          color:gold;
          background-color:white ;
          border:solid;
          right:2%;
          font-size:1rem;
          font-weight:bold;
        `}
      >
        &#10030;
      </button>
      <div>{selectedProduct.category}</div>
      <div>{selectedProduct.name}</div>
      <AvgStars currentProduct={selectedProduct} />
      <div>
        $
        {selectedProduct.default_price}
      </div>
      <Modal show={show} closeModalHandler={closeModalHandler} />
    </>
  );
}

ProductsCard.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

  mainProduct: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
};
