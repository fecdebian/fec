/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail';
import ReviewBodyText from './ReviewBodyText';

export default function ReviewBody({ body, photos }) {
  const textBody = body.slice(0, 1000);

  return (
    <div
      css={css`
        padding: 5px;
        margin: 5px;
        border: dotted 1px blue;
      `}
    >
      <ReviewBodyText text={body} />
      <div>{photos.map((photo) => <Thumbnail photo={photo} key={photo.id} />)}</div>
    </div>
  );
}

// ReviewSummary.propTypes = {
//   summary: PropTypes.string.isRequired,
// };