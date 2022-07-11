import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';

const avgStarsState = atom({
  key: 'avgStars',
  default: 0,
});

function Stars(productID) {
  const [avgStars, setAvgStars] = useRecoilState(avgStarsState);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { product_id: productID },
    })
      .then((reviews) => {
        console.log('reviews:', reviews);
        const ratingsObj = reviews.data.ratings;
        const ratingsValues = Object.values(ratingsObj);
        let sumOfRatings = 0;
        let avgRating = 0;
        // If there are no reviews, we need to hide this component.
        // Setting to -1 for conditional rendering below
        if (ratingsValues.length < 1) {
          setAvgStars(-1);
        } else {
          // Looping through array of values to get average of reviews
          for (let i = 0; i < ratingsValues.length; i += 1) {
            sumOfRatings += ratingsValues[i];
          }
          avgRating = sumOfRatings / ratingsValues.length;
          setAvgStars(avgRating);
        }
      })
      .catch((err) => console.log('Error getting average stars: ', err));
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
