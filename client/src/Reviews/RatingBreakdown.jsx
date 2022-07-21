/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { avgStarsState, totalReviewsState } from '../SharedComponents/ReviewWeightedAverage';
import reviewMetaState from '../SharedComponents/reviewMeta';
import StarReview from '../SharedComponents/StarReview';
import Breakdown from './Breakdown';
import ProductBreakdown from './ProductBreakdown';

export default function RatingBreakdown() {
  const avgStars = useRecoilValue(avgStarsState);
  const totalReviews = useRecoilValue(totalReviewsState);
  const reviewMeta = useRecoilValue(reviewMetaState);

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
      <Breakdown
        ratings={reviewMeta.data.ratings}
        totalReviews={totalReviews}
        recommended={reviewMeta.data.recommended}
      />
      <ProductBreakdown
        characteristics={reviewMeta.data.characteristics}
      />
    </div>
  );
}
