import React, { useEffect } from 'react';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';

const avgStarsState = atom({
  key: 'avgStars',
  default: 0,
});

function Stars(productID) {
  const [avgStars, setAvgStars] = useRecoilState(avgStarsState);
  const supposedId = productID;

  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: '/reviews/meta',
  //     params: { product_id: productID },
  //   })
  //     .then((reviews) => {
  //       const ratingsObj = reviews.data.ratings;
  //       const ratingsValues = Object.values(ratingsObj);
  //       const ratingsWeights = Object.keys(ratingsObj);
  //       let sumOfTotalRatings = 0;
  //       let sumOfWeightedRatings = 0;

  //       for (let i = 0; i < ratingsValues.length; i += 1) {
  //         sumOfTotalRatings += Number(ratingsValues[i]);
  //       }
  //       for (let i = 0; i < ratingsWeights.length; i += 1) {
  //         sumOfWeightedRatings += (ratingsValues[i] * ratingsWeights[i]);
  //       }
  //       const avgRating = (Math.round(((sumOfWeightedRatings / sumOfTotalRatings) * 4))
  //        / 4).toFixed(2);

  //       // If there are no reviews, we need to hide this component.
  //       // Setting to -1 for conditional rendering below
  //       if (sumOfTotalRatings < 1) {
  //         setAvgStars(-1);
  //       } else {
  //         setAvgStars(avgRating);
  //       }
  //     })
  //     .catch((err) => console.log('Error getting average stars: ', err));
  // }, [supposedId]);

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
