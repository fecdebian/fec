import React, { useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function Modal({
  show, closeModalHandler, selectedProduct, mainProduct,
}) {
  // //escape key button functionality
  // const closeOnEscapeKeyDown = (e) => {
  //   console.log((e.charCode || e.keyCode) === 27);
  //   if ((e.charCode || e.keyCoode) === 27) {
  //     closeModalHandler();
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener('keydown', closeOnEscapeKeyDown);
  //   return function cleanUp() {
  //     document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
  //   };
  // }, []);
  const comparingTable = {};
  if (show) {
    selectedProduct.features.forEach((item) => {
      comparingTable[item.feature] = [];
      comparingTable[item.feature].push(item.value);
    });

    mainProduct.features.forEach((item) => {
      if (comparingTable[item.feature] === undefined) {
        comparingTable[item.feature] = [];
        comparingTable[item.feature].push(null);
        comparingTable[item.feature].push(item.value);
      } else {
        comparingTable[item.feature].push(item.value);
      }
    });
  }

  if (!show) {
    return null;
  }
  return (
    <div
      className="modal"
      onClick={closeModalHandler}
      onKeyPress={closeModalHandler}
      role="button"
      tabIndex={0}
      css={css`
        position:fixed;
        left: 0;
        top: 0;
        right:0;
        bottom:0;
        background-color: rgba(0,0,0,0.5);
        display:flex;
        align-items:center;
        justify-content:center;
          `}
    >
      <div
        className="modal-content"
        css={css`
          width:500px;
          background-color: #fff;
        `}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyPress={(e) => {
          e.stopPropagation();
        }}
        role="button"
        tabIndex={0}
      >
        <div
          className="modal-header"
          css={css`
            padding:10px
          `}
        >
          <h4
            className="modal-title"
            css={css`
            margin: 0;
          `}
          >
            COMPARING
          </h4>
        </div>
        <div
          className="modal-body"
          css={css`
          padding:10px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          overflow: auto;
        `}
        >
          <table>
            <thead>
              <tr>
                <th>{mainProduct.name}</th>
                <th>Comparing</th>
                <th>{selectedProduct.name}</th>
              </tr>
            </thead>
            <tbody>
              {Object
                .keys(comparingTable)
                .map((key) => (
                  <tr key={key}>
                    <td>{comparingTable[key][0]}</td>
                    <td>{key}</td>
                    <td>{comparingTable[key][1]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className="modal-footer"
          css={css`
            padding:10px
          `}
        >
          <button
            type="button"
            className="button"
            onClick={closeModalHandler}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModalHandler: PropTypes.func.isRequired,
  selectedProduct: PropTypes.shape({
    name: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
  mainProduct: PropTypes.shape({
    name: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
};
