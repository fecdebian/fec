/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function BreakdownBars({ rating, totalReviews, handleClick }) {
  const [star, total] = rating;

  return (
    <div
      css={css`
      border: 2px dotted blue;
      border-radius: 4px;
      padding: 5px;
      width: 140px;
      &:hover {
        box-shadow: 0 0 30px red;
      }
    `}
      onClick={handleClick}
    >
      {`${star} Stars: ${total} , totalReviews: ${totalReviews}`}
    </div>
  );
}
