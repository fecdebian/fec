/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ReviewWeightedAverage } from '../SharedComponents/ReviewWeightedAverage';
import CatAndTitle from './CategoryAndTitle';
import GalleryDefault from './GalleryDefault';
import StylePrice from './StylePrice';
import StyleList from './StyleList';
import Cart from './Cart';
import ProductOverview from './ProductOverview';
import selectedProductStyle from './overviewAtoms';

function Overview() {
  return (
    <div css={css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    `}
    >
      <div css={css`
           display: grid;
           grid-column-start: 3;
           grid-column-end: 4;
           grid-row-start: 1;
           grid-row-end: 5;
           overflow: wrap;
    `}
      >
        <ReviewWeightedAverage />
        <CatAndTitle />
        <StylePrice />
        <StyleList />
        <Cart />
      </div>
      <div css={css`
            display: grid;
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 5;
           `}
      >
        <GalleryDefault />
      </div>
      <div
        css={css`
        display: grid;
        grid-column-start: 1;
        grid-column-end: 4;
      `}
      >
        <ProductOverview />
      </div>
    </div>
  );
}

export default Overview;
