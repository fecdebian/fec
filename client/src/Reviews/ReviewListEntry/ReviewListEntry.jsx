import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarReview from '../../SharedComponents/StarReview';
import FormattedDate from '../../SharedComponents/FormattedDate';
import ReviewSummary from './ReviewSummary';
import ReviewBody from './ReviewBody';
import Response from './Response';

const ReviewListEntry = React.forwardRef(({ entry }, ref) => {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (!clicked) {
      setClicked(true);
      axios
        .put(`/reviews/${entry.review_id}/helpful`)
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <li ref={ref}>
      <StarReview num={entry.rating} />
      <FormattedDate dateStr={entry.date} />
      <ReviewSummary summary={entry.summary} />
      <ReviewBody body={entry.body} photos={entry.photos} />
      <span>
        Review by:
        {' '}
        {entry.reviewer_name || 'Unknown Shopper'}
        {' '}
        | Verfied Purchaser |
      </span>
      {entry.recommend ? 'I recommend this product ✔️' : null}
      <Response />
      <p>
        helpful?
        <button
          type="button"
          onClick={() => handleClick()}
        >
          {`Yes (${clicked ? entry.helpfulness + 1 : entry.helpfulness})`}
        </button>
      </p>
    </li>
  );
});

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

export default ReviewListEntry;
