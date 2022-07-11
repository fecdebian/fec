import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stars(avgReview) {
  const [avgStars, setAvgStars] = useState(0);

  useEffect(() => {
    axios.get('/reviews/meta');
    .then((reviews) => {
    var ratingsObj = reviews.ratings;
    var ratingsValues = Object.values(ratingsObj);
    var sumOfRatings = 0;
    var avgRating = 0
    if (ratingsValues.length < 1) {

    }
    for (var i = 0; i < ratingsValues.length; i++) {
      sumOfRatings += ratingsValues[i];
    }
    })
    .catch((err) => console.log('Error getting average stars: ', err))
  });

  return (
    <div>
      {avgReview}
    </div>
  );
}

export default Stars;
