/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { avgStarsState, totalReviewsState } from '../SharedComponents/ReviewWeightedAverage';
import reviewMetaState from '../SharedComponents/reviewMeta';
import StarReview from '../SharedComponents/StarReview';

export default function RatingBreakdown() {
  const avgStars = useRecoilValue(avgStarsState);
  const totalReviews = useRecoilValue(totalReviewsState);
  const reviewMeta = useRecoilValue(reviewMetaState);
  console.log('reviews:', reviewMeta);

  return (
    <div>
      Average:
      {avgStars}
      <StarReview num={Number(avgStars)} />
      <p>
        Total reviews:
        {' '}
        {totalReviews}
      </p>
      <p>Ratings Breakdown:</p>
    </div>
  );
}
