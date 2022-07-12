import React, { useEffect } from 'react';
import {
  useRecoilValue,
  atom,
  useRecoilState,
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

let totalReviews = 0;

function ReviewWeightedAverage() {
  const product = useRecoilValue(currentProductState);
  const productID = product.id;
  const [avgStars, setAvgStars] = useRecoilState(avgStarsState);
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
        const ratingsValues = Object.values(ratingsObj);
        const ratingsWeights = Object.keys(ratingsObj);
        let sumOfTotalRatings = 0;
        let sumOfWeightedRatings = 0;

        for (let i = 0; i < ratingsValues.length; i += 1) {
          sumOfTotalRatings += Number(ratingsValues[i]);
          totalReviews += Number(ratingsValues[i]);
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
      <button>
        Read all {totalReviews} reviews
      </button>
    </div>
  );
}

export default ReviewWeightedAverage;
