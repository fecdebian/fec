/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const color = 'white';

export default function SubmitReviewButton({ handleClick }) {
  return (
    <button
      type="button"
      css={css`
      padding: 12px;
      background-color: hotpink;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
    >
      Submit a new Review
    </button>
  );
}
