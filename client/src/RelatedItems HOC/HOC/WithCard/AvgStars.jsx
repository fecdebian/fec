import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarReview from '../../../SharedComponents/StarReview';

function AvgStars({ currentProduct }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [avgStars, setAvgStars] = useState(0);
  const product = currentProduct;
  const productID = product.id;
  let avgRating = 0;

  /* ===========    Gat rating from API and Calculate Average Rating    =========== */
  useEffect(() => {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { product_id: productID },
    })
      .then((reviews) => {
        const ratingsObj = reviews.data.ratings;
        let sumOfTotalRatings = 0;
        let sumOfWeightedRatings = 0;

        // eslint-disable-next-line no-restricted-syntax
        for (const [rate, entries] of Object.entries(ratingsObj)) {
          sumOfTotalRatings += Number(entries);
          sumOfWeightedRatings += rate * entries;
        }
        avgRating = (sumOfWeightedRatings / sumOfTotalRatings).toFixed(2);
        setIsLoaded(true);

        // If there are no reviews, we need to hide this component.
        // Setting to -1 for conditional rendering below
        if (sumOfTotalRatings < 1) {
          setAvgStars(-1);
        } else {
          setAvgStars(avgRating);
        }
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <StarReview num={Number(avgStars)} />
  );
}

AvgStars.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default AvgStars;
