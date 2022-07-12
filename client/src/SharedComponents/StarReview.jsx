/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

const stars = ['🌑', '🌘', '🌓', '🌖', '🌕'];

export default function StarReview({ num }) {
  const numStars = Math.floor(num);
  const leftOver = Math.floor((num - numStars) / 0.25);
  const result = Array(numStars).fill(stars[4]);
  const leftOverStar = stars[leftOver];

  if (numStars !== 5) {
    result.push(leftOverStar);
  }

  while (result.length < 5) {
    result.push(stars[0]);
  }

  return (
    <span
      css={css`
        border: solid cyan 2px;
        background-color: cyan;
      `}
    >
      {result}
    </span>
  );
}

StarReview.propTypes = {
  num: PropTypes.number.isRequired,
};
