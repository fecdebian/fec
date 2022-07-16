/** @jsx jsx */
import { css, jsx } from '@emotion/react';
// import PropTypes from 'prop-types';

import ReviewListEntry from './ReviewListEntry/ReviewListEntry';
import MoreReviewsButton from './MoreReviewsButton';
import {
  useReviews,
  useReviewsDispatch,
  useReviewsTotalLengthContext
} from './ReviewsContext';

export default function ReviewList() {
  // const [currentEntryLen, setCurrentEntryLen] = useState(2);
  // const [displayButton, setDisplayButton] = useState(true);
  const reviewEntries = useReviews();
  const dispatch = useReviewsDispatch();
  const totalLength = useReviewsTotalLengthContext();
  const entriesLen = reviewEntries.length;
  const displayButton = entriesLen < totalLength;

  return entriesLen !== 0
  && (
  <div
    css={css`
          max-height: 270px;
          overflow: auto;
          padding: 10px;
          margin: 10px;
          border: solid red 2px;
      `}
  >
    {reviewEntries
      .map((entry) => (
        <ReviewListEntry
          entry={entry}
          key={entry.review_id}
        />
      ))}
    {displayButton
        && (
        <MoreReviewsButton
          onClick={() => {
            dispatch({
              type: 'show_more',
            });
          }}
        />
        )}
  </div>
  );
}
