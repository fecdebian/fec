import React from 'react';
import PropTypes from 'prop-types';

function ProductOverview({ slogan, description }) {
  return (
    <div>
      <h2>{slogan}</h2>
      <h3>{description}</h3>
    </div>
  );
}

ProductOverview.propTypes = {
  slogan: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default ProductOverview;
