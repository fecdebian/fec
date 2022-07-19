/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ReviewWeightedAverage } from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import StylePrice from './StylePrice';
import StyleList from './StyleList';
import Cart from './Cart';
import ProductOverview from './ProductOverview';

function Overview() {
  return (
    <div css={css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: auto;
    padding: 0px;
    margin: 0px;
    `}
    >
      <div css={css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    overflow: auto;
    padding: 0px;
    margin: 0px;
    `}
      >
        <ReviewWeightedAverage />
      </div>
      <CatAndTitle />
      <StylePrice />
      <StyleList />
      <Cart />
      <ProductOverview />
    </div>
  );
}

export default Overview;
