import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

import currentMetaReviewState from '../reviewMeta';

const avgStarsState = atom({
  key: 'avgStars',
  default: 0,
});
const [avgStars, setAvgStars] = useRecoilState(avgStarsState);

function Stars() {
  useEffect(() => {
    const metaReviewRatings = currentMetaReviewState.ratings;
    const ratingsValues = Object.values(metaReviewRatings);
    const ratingsWeights = Object.keys(metaReviewRatings);
    let sumOfTotalRatings = 0;
    let sumOfWeightedRatings = 0;

    for (let i = 0; i < ratingsValues.length; i += 1) {
      sumOfTotalRatings += Number(ratingsValues[i]);
    }
    for (let i = 0; i < ratingsWeights.length; i += 1) {
      sumOfWeightedRatings += (ratingsValues[i] * ratingsWeights[i]);
    }
    const avgRating = (Math.round(((sumOfWeightedRatings / sumOfTotalRatings) * 4))
      / 4).toFixed(2);

    // If there are no reviews, we need to hide this component.
    // Setting to -1 for conditional rendering below
    if (sumOfTotalRatings < 1) {
      setAvgStars(-1);
    } else {
      setAvgStars(avgRating);
    }
  }, []);

  let averageStarRating = avgStars;
  if (averageStarRating < 0) {
    averageStarRating = '';
  }
  return (
    <div>
      {averageStarRating}
    </div>
  );
}

export default Stars;
