/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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
      <StyledStarButton
        onClick={openModalHandler}
        type="button"
      >
        <span>&#10030;</span>
      </StyledStarButton>
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
  }).isRequired,

  mainProduct: PropTypes.shape({
  }).isRequired,
};

/* ===========    CSS Styled Components   =========== */
const StyledStarButton = styled.button`
position:absolute;
color:gold;
background-color:white ;
border:solid;
right:2%;
font-size:1rem;
font-weight:bold;
`;
