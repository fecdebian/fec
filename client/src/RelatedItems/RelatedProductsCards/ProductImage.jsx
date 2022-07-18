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
              // setProductImage('__dirname + ../../../asset/image/NoImage.png');
              // setProductImage(NoImage);
              // setProductImage('client/asset/image/NoImage.png');
              setProductImage('https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg');
            }
          }
        });
        if (hasDefault === false) {
          if (styleResults[0].photos[0].thumbnail_url !== null) {
            setProductImage(styleResults[0].photos[0].thumbnail_url);
          } else {
            setProductImage('https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg');
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
    // <div>
    <img alt={product.name} src={productImage} width="100%" height="160" />
    // <img alt={product.name} src="../../../asset/image/NoImage.png" width="100%" height="160" />
    // </div>
  );
}

ProductImage.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default ProductImage;
