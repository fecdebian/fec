/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef } from 'react';

import ReviewListEntry from './ReviewListEntry/ReviewListEntry';
import MoreReviewsButton from './MoreReviewsButton';
import {
  useReviews,
  useReviewsDispatch,
  useReviewsTotalLengthContext,
} from './ReviewsContext';

export default function ReviewList() {
  const reviewEntries = useReviews();
  const dispatch = useReviewsDispatch();
  const totalLength = useReviewsTotalLengthContext();
  const entriesLen = reviewEntries.length;
  const displayButton = entriesLen < totalLength;
  const firstReviewId = reviewEntries[0]?.review_id || null;

  const reviewRef = useRef(null);

  function getMap() {
    if (!reviewRef.current) {
      reviewRef.current = new Map();
    }
    return reviewRef.current;
  }

  function scrollToId(reviewId) {
    const map = getMap();
    const node = map.get(reviewId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return entriesLen !== 0
  && (
  <div
    css={css`
          max-height: 470px;
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
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(entry.review_id, node);
            } else {
              map.delete(entry.review_id);
            }
          }}
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
    <button
      onClick={() => scrollToId(firstReviewId)}
      type="button"
    >
      Back to Top
    </button>
  </div>
  );
}
