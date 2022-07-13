/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail';

export default function ReviewSummary({ body, photos }) {
  return (
    <div>
      Body: {body}
      <div>{photos.map(photo => <Thumbnail photo={photo} key={photo.id} />)}</div>
    </div>
  );
}

// ReviewSummary.propTypes = {
//   summary: PropTypes.string.isRequired,
// };