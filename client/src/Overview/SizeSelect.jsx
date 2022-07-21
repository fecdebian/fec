/** @jsx jsx */
import { useRecoilValue, useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';
import React from 'react';

import {
  selectedProductStyle,
  selectedSize,
  totalQuant,
} from './overviewAtoms';

function SizeSelect() {
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  const [size, setSize] = useRecoilState(selectedSize);
  const [newTotalQuant, setNewTotalQuant] = useRecoilState(totalQuant);
  let sizesList = [];

  if (currentProductStyle.style_id === undefined) {
    return <div>Sizes Loading...</div>;
  }

  const styleSKUs = Object.values(currentProductStyle.skus);
  const styleSizes = [{ size: 'Select Size' }];
  for (let i = 0; i < styleSKUs.length; i += 1) {
    if (styleSKUs[i].quantity > 0) {
      styleSizes.push(styleSKUs[i]);
    }
  }
  sizesList = styleSizes;
  if (sizesList.length < 1) {
    sizesList = [{ 'OUT OF STOCK': 0 }];
    setSize('OUT OF STOCK');
  }

  const setNewSize = (e) => {
    e.preventDefault();
    const newQuantAndSize = e.target.value;
    const newSelectedTotalQuant = newQuantAndSize.slice(0, newQuantAndSize.indexOf(','));
    const newSize = newQuantAndSize;
    setSize(newSize);
    setNewTotalQuant(newSelectedTotalQuant);
  };

  let keys = 0;
  return (
    <form>
      <select value={size} onChange={setNewSize}>
        {sizesList.map((oneSize) => (
          // eslint-disable-next-line no-plusplus
          <option value={Object.values(oneSize)} key={keys++}>
            {oneSize.size}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SizeSelect;
