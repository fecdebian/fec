/** @jsx jsx */
import { useRecoilValue, useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import axios from 'axios';

import SizeSelect from './SizeSelect';
import QuantitySelect from './QuantitySelect';
import AddToCart from './AddToCart';
import { selectedProductStyle, selectedQuant, selectedSize } from './overviewAtoms';

function Cart() {
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  const cartQuant = useRecoilValue(selectedQuant);
  const cartSize = useRecoilValue(selectedSize);
  const [addSizePopup, setAddSizePopup] = useState(null);
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
    });
  };

  const cartClickHandler = () => {
    if (cartSize === 'Select Size') {
      setAddSizePopup('Please select size');
    }
    if (cartSize !== 'Select Size' && cartQuant > 0) {
      postToCart();
    }
  };

  if (cartSize === 'OUT OF STOCK') {
    return (
      <div>
        <SizeSelect />
        <QuantitySelect />
      </div>
    );
  }

  return (
    <div>
      {addSizePopup}
      <SizeSelect />
      <QuantitySelect />
      <button type="submit" onClick={cartClickHandler}> Add to Cart </button>
      {/* <AddToCart /> */}
    </div>
  );
}

export default Cart;
