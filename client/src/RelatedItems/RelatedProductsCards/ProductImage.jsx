import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ProductImage({ currentProduct }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productImage, setProductImage] = useState(0);
  const product = currentProduct;
  const productID = product.id;

  useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${productID}/styles`,
    })
      .then((style) => {
        const styleResults = style.data.results;
        let hasDefault = false;
        styleResults.forEach((result) => {
          if (result['default?'] === true) {
            hasDefault = true;
            setProductImage(result.photos[0].thumbnail_url);
          }
        });
        if (hasDefault === false) {
          setProductImage(styleResults[0].photos[0].thumbnail_url);
        }
        setIsLoaded(true);
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
    <div>
      <img alt={product.name} src={productImage} width="160" height="160" />
    </div>
  );
}

ProductImage.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default ProductImage;
