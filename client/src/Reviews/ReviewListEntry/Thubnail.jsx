/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function ReviewSummary({ body }) {
  return (
    <div>Body: {body}</div>
  );
}

// ReviewSummary.propTypes = {
//   summary: PropTypes.string.isRequired,
// };