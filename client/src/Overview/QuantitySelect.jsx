/** @jsx jsx */
import { useRecoilValue, useRecoilState } from 'recoil';
import { css, jsx } from '@emotion/react';

import { selectedProductStyle, selectedQuant, totalQuant } from './overviewAtoms';

function QuantitySelect() {
  const currentProductStyle = useRecoilValue(selectedProductStyle);
  const totalStyleQuant = useRecoilValue(totalQuant);
  const [currentSelectedQuant, setCurrentSelectedQuant] = useRecoilState(selectedQuant);
  let quantsList = ['-'];

  if (currentProductStyle.style_id === undefined) {
    return <div>Quants Loading...</div>;
  }

  let quantAvailable = totalStyleQuant;
  if (quantAvailable > 15) {
    quantAvailable = 15;
  }

  for (let i = 1; i < quantAvailable; i += 1) {
    quantsList.push(i);
  }

  const setNewQuant = (e) => {
    setCurrentSelectedQuant(e.target.value);
  };

  let keys = 0;
  return (
    <form>
      <select value={currentSelectedQuant} onChange={setNewQuant}>
        {quantsList.map((oneSize) => (
          // eslint-disable-next-line no-plusplus
          <option value={oneSize} key={keys++}>
            {oneSize}
          </option>
        ))}
      </select>
    </form>
  );
}

export default QuantitySelect;
