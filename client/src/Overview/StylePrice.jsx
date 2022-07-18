/** @jsx jsx */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { css, jsx } from '@emotion/react';

import { currentProductStyles, selectedProductStyle } from './overviewAtoms';
import currentProductState from '../currentProduct';

function StylePrice() {
  const product = useRecoilValue(currentProductState);
  const productID = product.id;

  const [productStyles, setProductStyles] = useRecoilState(currentProductStyles);
  const [selectedStyle, setSelectedStyle] = useRecoilState(selectedProductStyle);

  function getStyles() {
    axios({
      method: 'get',
      url: `/products/${productID}/styles`,
    })
      .then((response) => {
        const allStyles = response.data.results;
        let defaultStyle = {};
        response.data.results.forEach((result) => {
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
  if (selectedStyle.style_id === undefined) {
    return <h1>loading</h1>;
  }

  if (selectedStyle.sale_price === null) {
    return (
      <div css={css`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      overflow: auto;
      padding: 10px;
      margin: 10px;
      `}
      >
        $
        {selectedStyle.original_price}
      </div>
    );
  }
  return (
    <div css={css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    overflow: auto;
    padding: 10px;
    margin: 10px;
    `}
    >
      <span
        css={css`
        color: red;
        margin: 4px;
        `}
      >
        $
        {selectedStyle.sale_price}
      </span>
      <span
        css={css`
          text-decoration: line-through;
          margin: 4px;
          `}
      >
        $
        {selectedStyle.original_price}
      </span>
    </div>
  );
}

export default StylePrice;
