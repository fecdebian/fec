import React, { useEffect } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import axios from 'axios';

import currentMetaReview from './reviewMeta';
import currentProductState from '../currentProduct';
import StarReview from './StarReview';

const avgStarsState = atom({
  key: 'avgStars',
  default: 0,
});

// let totalReviews = 0;
const totalReviewsState = atom({
  key: 'totalReviews',
  default: 0,
});

function ReviewWeightedAverage() {
  const product = useRecoilValue(currentProductState);
  const productID = product.id;
  const [avgStars, setAvgStars] = useRecoilState(avgStarsState);
  const [totalReviews, setTotalReviews] = useRecoilState(totalReviewsState);
  const setMetaReview = useSetRecoilState(currentMetaReview);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { product_id: productID },
    })
      .then((reviews) => {
        setMetaReview(reviews);
        const ratingsObj = reviews.data.ratings;
        let sumOfTotalRatings = 0;
        let sumOfWeightedRatings = 0;

        // eslint-disable-next-line no-restricted-syntax
        for (const [rate, entries] of Object.entries(ratingsObj)) {
          sumOfTotalRatings += Number(entries);
          setTotalReviews((prev) => prev + Number(entries));
          sumOfWeightedRatings += rate * entries;
        }

        const avgRating = (sumOfWeightedRatings / sumOfTotalRatings).toFixed(2);

        // If there are no reviews, we need to hide this component.
        // Setting to -1 for conditional rendering below
        if (sumOfTotalRatings < 1) {
          setAvgStars(-1);
        } else {
          setAvgStars(avgRating);
        }
      })
      .catch((err) => console.log('Error getting average stars: ', err));
  }, []);

  const averageStarRating = Number(avgStars);
  if (totalReviews < 1) {
    return null;
  }

  return (
    <div>
      <StarReview num={averageStarRating} />
      <button type="button">
        Read all {totalReviews} reviews
      </button>
    </div>
  );
}

export { ReviewWeightedAverage, avgStarsState, totalReviewsState };
