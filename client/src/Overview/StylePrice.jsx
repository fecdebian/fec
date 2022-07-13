import React, { useEffect } from 'react';
import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import axios from 'axios';
import PropTypes from 'prop-types';

import { currentProductStyles, selectedProductStyle } from './overviewAtoms';

function StylePrice({ currentProduct }) {
  const product = currentProduct;
  const productID = product.id;
  const [productStyles, setProductStyles] = useRecoilState(currentProductStyles);
  const [selectedStyle, setSelectedStyle] = useRecoilState(selectedProductStyle);
  // Use effect for initial render and if productID changes
  useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${productID}/styles`,
      params: { product_id: productID },
    })
      .then((response) => {
        const allStyles = {};
        const defaultStyle = {};
        response.data.results.forEach((result) => {
          allStyles[result.style_id] = result;
          if (result['default?'] === true) {
            defaultStyle[result.style_id] = result;
          }
        });
        setProductStyles(allStyles);
        setSelectedStyle(defaultStyle);
      })
      .catch((err) => console.log('error getting product styles: ', err));
  }, [product]);
  // Use effect for if selected style changes
  if (selectedStyle.style_id === undefined) {
    return <h1>loading</h1>;
  }
  console.log('selectedStyle: ', selectedStyle);

  const orgPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  if (orgPrice === salePrice) {
    return (
      <div>
        {orgPrice}
      </div>
    );
  }
  return (
    <div>
      {orgPrice}
      {salePrice}
    </div>
  );
}

StylePrice.propTypes = {
  currentProduct: PropTypes.shape({
    style_id: PropTypes.number,
  }).isRequired,
};
export default StylePrice;
