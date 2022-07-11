/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewListEntry from './ReviewListEntry';
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

  return totalEntries === 0
    ? null
    : (
      <div
        css={css`
        max-height: 70px;
        overflow: auto;
        padding: 10px;
        margin: 10px;
        border: solid red 2px;
      `}
      >
        {reviewEntries
          .slice(0, currentEntryLen)
          .map((entry) => (
            <ReviewListEntry
              entry={entry}
              key={entry.review_id}
            />
          ))}
        {displayButton ? <MoreReviewsButton onClick={handleClick} /> : null}
      </div>
    );
}

ReviewList.propTypes = {
  reviewEntries: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
