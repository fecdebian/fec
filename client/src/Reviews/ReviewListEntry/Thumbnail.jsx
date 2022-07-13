/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

export default function Thumbnail({ photo }) {
  return (
    <a target="_blank" href={photo.url}>
      <img
        css={css`
          border: 1px dotted #ddd;
          border-radius: 4px;
          padding: 5px;
          width: 140px;
          &:hover {
            box-shadow: 0 0 30px red;
          }
        `}
        src={photo.url}
        alt="thumbnail"
      />
    </a>
  );
}

// ReviewSummary.propTypes = {
//   summary: PropTypes.string.isRequired,
// };