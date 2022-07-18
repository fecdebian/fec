/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';

import Modal from './Modal/Modal';

export default function withStarButton() {
  function WithStarButton({selectedProduct, mainProduct}) {
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
        {/* <Modal
          show={show}
          closeModalHandler={closeModalHandler}
          selectedProduct={selectedProduct}
          mainProduct={mainProduct}
        /> */}
      </>

    );
  }
  // const wrappedComponentName = WrappedComponent.displayName
  //   || WrappedComponent.name
  //   || 'Component';
  // WithStarButton.displayName = `withStarButton(${wrappedComponentName})`;

  return WithStarButton;
}
