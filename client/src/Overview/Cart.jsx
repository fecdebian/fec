/** @jsx jsx */
import { useRecoilState, useRecoilValue } from 'recoil';
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import axios from 'axios';

import SizeSelect from './SizeSelect';
import QuantitySelect from './QuantitySelect';
import { selectedProductStyle, selectedQuant, selectedSize, addSizePop } from './overviewAtoms';

function Cart() {
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  const [cartQuant, setCartQuant] = useRecoilState(selectedQuant);
  const [cartSize, setCartSize] = useRecoilState(selectedSize);
  const [addSizePopup, setAddSizePopup] = useRecoilState(addSizePop);
  if (currentProductStyle.style_id === undefined) {
    return <div>Cart Loading...</div>;
  }
  const skuLength = Object.keys(currentProductStyle.skus).length;
  const skuVals = Object.keys(currentProductStyle.skus);
  const skuSizes = Object.values(currentProductStyle.skus);
  const skuList = [];
  let skuVal = '';
  for (let i = 0; i < skuLength; i += 1) {
    const skuID = skuVals[i];
    const skuSize = skuSizes[i].size;
    skuList.push({ skuID, skuSize });
  }
  for (let i = 0; i < skuList.length; i += 1) {
    const matchSize = cartSize.slice(cartSize.indexOf(',') + 1);
    if (matchSize === skuList[i].skuSize) {
      skuVal = skuList[i].skuID;
    }
  }

  const postToCart = () => {
    axios({
      method: 'post',
      url: '/cart',
      data: {
        sku_id: skuVal,
      },
    })
      .catch((err) => {
        console.error('Unable to post to cart', err);
      });
  };

  const cartClickHandler = (e) => {
    e.preventDefault();
    let cartCounter = 0;
    if (cartSize === 'Select Size') {
      setAddSizePopup('Please select size');
    }
    if (cartSize !== 'Select Size' && cartQuant > 0) {
      const repeatCartPost = () => {
        if (cartCounter < cartQuant) {
          cartCounter += 1;
          postToCart();
        }
      };
      repeatCartPost();
    }
    setCartQuant('-');
    setCartSize('Select Size');
  };

  if (cartSize === 'OUT OF STOCK') {
    return (
      <div css={css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    `}>
        <div css={css`
          display: grid;
          grid-column-start: 1;
          grid-column-end: 1;
      `}>
          <SizeSelect />
        </div>
        <div css={css`
          display: grid;
          grid-column-start: 2;
          grid-column-end: 2;
      `}>
          <QuantitySelect />
        </div>
      </div>
    );
  }

  return (
    <div css={css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  `}>
      {addSizePopup}
      <div css={css`
          display: grid;
          grid-column-start: 1;
          grid-column-end: 1;
      `}
      >
        <SizeSelect />
      </div>
      <div css={css`
        display: grid;
        grid-column-start: 2;
        grid-column-end: 2;
    `}>
        <QuantitySelect />
      </div>
      <div css={css`
        display: grid;
        grid-column-start: 1;
        grid-column-end: 2;
    `}>
        <button type="submit" onClick={cartClickHandler}> Add to Cart </button>
      </div>
    </div>
  );
}

export default Cart;
