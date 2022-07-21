/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal/Modal';

export default function StarButton({ selectedProduct, mainProduct }) {
  const [show, setShow] = useState(false);
  const openModalHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => {
    setShow(false);
  };

  return (
    <>
      <button
        onClick={openModalHandler}
        type="button"
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
        <span>&#10030;</span>
      </button>
      <Modal
        show={show}
        closeModalHandler={closeModalHandler}
        selectedProduct={selectedProduct}
        mainProduct={mainProduct}
      />
    </>

  );
}

StarButton.propTypes = {
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
