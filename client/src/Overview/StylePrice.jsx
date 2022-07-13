import React, { useEffect } from 'react';
import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import axios from 'axios';
import PropTypes from 'prop-types';

import { currentProductStyles, selectedProductStyle } from './overviewAtoms';

function StylePrice({ currentProduct, currentStyle }) {
  const product = currentProduct;
  const productID = product.id;
  const style = currentStyle;
  const [productStyles, setProductStyles] = useRecoilState(currentProductStyles);
  const [selectedStyle, setSelectedStyle] = useRecoilState(selectedProductStyle);
  // Use effect for initial render and if productID changes
  function getStyles() {
    axios({
      method: 'get',
      url: `/products/${productID}/styles`,
    })
      .then((response) => {
        const allStyles = {};
        let defaultStyle = {};
        response.data.results.forEach((result) => {
          allStyles[result.style_id] = result;
          if (result['default?'] === true) {
            defaultStyle = result;
          }
        });
        setProductStyles(allStyles);
        setSelectedStyle(defaultStyle);
      })
      .catch((err) => console.log('error getting product styles: ', err));
  }

  useEffect(() => {
    getStyles();
  }, [product]);

  // Use effect for if selected style changes
  if (style.style_id === undefined) {
    return <h1>loading</h1>;
  }

  if (style.sale_price === null) {
    return (
      <div>
        $
        {style.original_price}
      </div>
    );
  }
  return (
    <div>
      $
      {style.original_price}
      $
      {style.sale_price}
    </div>
  );
}

StylePrice.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  currentStyle: PropTypes.shape({
    style_id: PropTypes.number,
  }).isRequired,
};

export default StylePrice;
