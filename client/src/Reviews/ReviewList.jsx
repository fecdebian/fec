import React from 'react';
import ReviewListEntry from './ReviewListEntry';
import PropTypes from 'prop-types';

export default function ReviewList({ reviewEntries }) {
  const entryNums = reviewEntries.length;

  return entryNums > 0
    ? reviewEntries.map((entry) => <ReviewListEntry entry={entry} key={entry.review_id} />)
    : <div>No Reviews</div>;
}

ReviewList.propTypes = {
  reviewEntries: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
