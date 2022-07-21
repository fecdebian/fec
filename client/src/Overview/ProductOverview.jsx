/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import currentProductState from '../currentProduct';

function ProductOverview() {
  const product = useRecoilValue(currentProductState);
  const slogan = product.slogan;
  const description = product.description;
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
      <div css={css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 10px;
    margin: 10px;
    `}
      >
        <h2>{slogan}</h2>
        <h3>{description}</h3>
      </div>
    </div>
  );
}

export default ProductOverview;
