import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import NoImage from '../../../asset/image/NoImage.png';

function ProductImage({ currentProduct }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productImage, setProductImage] = useState(0);
  const product = currentProduct;
  const productID = product.id;

  /* ===========    Gat Styles Photos from API and and render photos   =========== */
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
            if (result.photos[0].thumbnail_url !== null) {
              setProductImage(result.photos[0].thumbnail_url);
            } else {
              setProductImage('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png');
            }
          }
        });
        if (hasDefault === false) {
          if (styleResults[0].photos[0].thumbnail_url !== null) {
            setProductImage(styleResults[0].photos[0].thumbnail_url);
          } else {
            setProductImage('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png');
          }
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
    <img alt={product.name} src={productImage} width="160" height="200" />
  );
}

ProductImage.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default ProductImage;
