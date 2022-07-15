import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import StarReview from '../../SharedComponents/StarReview';

function AvgStars({
  currentProduct, isLoaded, avgStars,
}) {
  // console.log(typeof avgStars);
  // console.log(avgStars);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [avgStars, setAvgStars] = useState(0);
  // const product = currentProduct;
  // const productID = product.id;
  // let avgRating = 0;

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

  //       avgRating = (Math.round(((sumOfWeightedRatings / sumOfTotalRatings) * 4))
  //         / 4).toFixed(2);
  //       setIsLoaded(true);
  //       setAvgStars(avgRating);
  //     })
  //     .catch((err) => {
  //       setIsLoaded(true);
  //       setError(err);
  //     });
  // }, []);

  // if (error) {
  //   return (
  //     <div>
  //       Error:
  //       {error.message}
  //     </div>
  //   );
  // }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <StarReview num={(avgStars)} />
  );
}

AvgStars.propTypes = {
  // currentProduct: PropTypes.shape({
  //   id: PropTypes.number,
  // }).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  avgStars: PropTypes.number.isRequired,
  // error: PropTypes.shape({
  //   message: PropTypes.string,
  // }).isRequired,
};

export default AvgStars;
