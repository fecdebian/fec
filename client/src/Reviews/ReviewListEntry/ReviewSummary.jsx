/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function ReviewSummary({ summary }) {
  const sum = summary.length > 50 ? `${summary.slice(0, 50)}...` : summary;

  return (
    <div
      css={css`
        font-weight: bold;
      `}
    >
      {sum}
    </div>
  );
}

ReviewSummary.propTypes = {
  summary: PropTypes.string.isRequired,
};
