import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function Modal({ show, closeModalHandler }) {
  if (!show) {
    return null;
  }
  return (
    <div
      className="modal"
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
            Modal title
          </h4>
        </div>
        <div
          className="modal-body"
          css={css`
          padding:10px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        `}
        >
          This is modal content
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
};
