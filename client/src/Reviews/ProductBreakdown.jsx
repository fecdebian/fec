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
      {Object.keys(characteristics).map((item) => (
        <div key={characteristics[item].id}>
          {item}
          {' '}
          :
          <StarReview num={Number(characteristics[item].value)} />
        </div>
      ))}
      {/* <div>Comfort: <StarReview num={Number(characteristics.Comfort.value)} /></div>
      <div>Fit: <StarReview num={Number(characteristics.Fit.value)} /></div>
      <div>Length: <StarReview num={Number(characteristics.Length.value)} /></div>
      <div>Quality: <StarReview num={Number(characteristics.Quality.value)} /></div> */}
    </div>
  );
}
