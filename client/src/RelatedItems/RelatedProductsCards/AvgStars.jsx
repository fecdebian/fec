import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import StarReview from '../../SharedComponents/StarReview';

function AvgStars({ isLoaded, avgStars }) {
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <StarReview num={(avgStars)} />
  );
}

AvgStars.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  avgStars: PropTypes.number.isRequired,
};

export default AvgStars;
