/** @jsx jsx */
import { useRecoilValue, useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle, selectedSize } from './overviewAtoms';

function SizeSelect() {
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  const [size, setSize] = useRecoilState(selectedSize);
  let sizesList = [];

  if (currentProductStyle.style_id === undefined) {
    return <div>Sizes Loading...</div>;
  }

  const styleSKUs = Object.values(currentProductStyle.skus);
  const styleSizes = [];
  for (let i = 0; i < styleSKUs.length; i += 1) {
    if (styleSKUs[i].quantity > 0) {
      const currentSize = styleSKUs[i].size;
      const currentQuant = styleSKUs[i].quantity;
      const sizeAdd = {};
      sizeAdd[currentSize] = currentQuant;
      styleSizes.push(sizeAdd);
    }
  }
  sizesList = styleSizes;
  if (sizesList.length < 1) {
    setSize('OUT OF STOCK');
  }

  const setNewSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <form>
      <select value={size} onChange={setNewSize}>
        {sizesList.map((oneSize) => (
          <option value={Object.keys(oneSize)}>
            {Object.keys(oneSize)}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SizeSelect;
