/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

import ReviewList from './ReviewList';

import sampleReview from './sampleReview';

export default function Reviews() {
  return (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
      `}
    >
      <ReviewList reviewEntries={sampleReview.results} />
      {/* <ReviewList reviewEntries={[]} /> */}
    </div>
  );
}
