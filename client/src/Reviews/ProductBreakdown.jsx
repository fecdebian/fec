/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import StarReview from '../SharedComponents/StarReview';

export default function ProductBreakdown({ characteristics }) {
  return (
    <div
      css={css`
        border: red dotted 1px;
      `}
    >
      <div>Comfort: <StarReview num={characteristics.Comfort.value} /></div>
      <div>Fit: <StarReview num={characteristics.Fit.value} /></div>
      <div>Length: <StarReview num={characteristics.Length.value} /></div>
      <div>Quality: <StarReview num={characteristics.Quality.value} /></div>
    </div>
  );
}
