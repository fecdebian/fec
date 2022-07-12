import React from 'react';
import PropTypes from 'prop-types';

import StarReview from '../../SharedComponents/StarReview';
import FormattedDate from '../../SharedComponents/FormattedDate';

export default function ReviewListEntry({ entry }) {
  return (
    <div>
      <StarReview num={entry.rating} />
      <FormattedDate dateStr={entry.date} />
    </div>
  );
}

ReviewListEntry.propTypes = {
  entry: PropTypes.shape({
    review_id: PropTypes.number,
    rating: PropTypes.number,
    summary: PropTypes.string,
    recommend: PropTypes.bool,
    response: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })),
  }).isRequired,
};
