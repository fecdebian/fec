import React, { useState } from 'react';
import ReviewListEntry from './ReviewListEntry';
import PropTypes from 'prop-types';
import MoreReviewsButton from './MoreReviewsButton';

export default function ReviewList({ reviewEntries }) {
  const [currentEntryLen, setCurrentEntryLen] = useState(2);
  const [displayButton, setDisplayButton] = useState(true);
  const totalEntries = reviewEntries.length;

  const handleClick = () => {
    if (currentEntryLen + 2 >= totalEntries) {
      setDisplayButton(false);
    }
    setCurrentEntryLen(currentEntryLen + 2);
  };

  return (
    <div>
      {reviewEntries.slice(0, currentEntryLen).map((entry) => {
        return <ReviewListEntry entry={entry} key={entry.review_id} />
      })}
      {displayButton ? <MoreReviewsButton onClick={handleClick} /> : null}
    </div>
  );
}

ReviewList.propTypes = {
  reviewEntries: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
