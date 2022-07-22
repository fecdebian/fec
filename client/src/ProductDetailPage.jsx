/** @jsx jsx */
import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';

import Overview from './Overview/OverviewParent';
// import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import currentProductState from './currentProduct';
import { displayModeState } from './QuestionsAndAnswers/atoms';
import RelatedItems from './RelatedItems HOC';
import withBigBrotherWatching from './SharedComponents/bigBrotherIsWatchingYou';
import ToggleButton from './ToggleButton';

const OverviewUnderWatch = withBigBrotherWatching(Overview);
const RelatedItemsUnderWatch = withBigBrotherWatching(RelatedItems);
const ReviewsUnderWatch = withBigBrotherWatching(Reviews);
const QuestionsAndAnswersUnderWatch = withBigBrotherWatching(QuestionsAndAnswers);
// Huzzah for jsx!
const ProductDetailPage = function WhateverStupidName() {
  const [currentProduct, setCurrentProduct] = useRecoilState(currentProductState);
  const displayMode = useRecoilValue(displayModeState);

  useEffect(() => {
    axios
      .get('./products')
      .then((response) => {
        setCurrentProduct(response.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  if (currentProduct.id === undefined) {
    return <h1>loading</h1>;
  }
  const light = `
  font-family: Gill Sans, Verdana;
  background: #D3D3D3;
  color: #3BAFDA;
  button {
    font-family: inherit;
    background-color: #3BAFDA;
    color: white;
    // font-size: 14px;
    padding: 2px 4px;
    border-radius: 3px;
    cursor: pointer;

  }
  h1 {
    text-align: center;
    padding: 0;
    margin-top: 0;
    margin-bottom: 10px;
  }
  img {
    border: 1px solid black;
  }
  input::placeholder {
    font-family: Gill Sans, Verdana;
  }
  select {
    font-family: inherit;
  }
  `;
  const dark = `
  font-family: Gill Sans, Verdana;
  background: #2C3333;
  color: #3BAFDA;
  button {
    font-family: inherit;
    background-color: #3BAFDA;
    color: white;
    // font-size: 14px;
    padding: 2px 4px;
    border-radius: 3px;
    cursor: pointer;
  }
  img {
    border: 1px solid black;
  }
  input::placeholder {
    font-family: Gill Sans, Verdana;
  }
  select {
    font-family: inherit;
  }
  `;
  return (
    <div
      css={css`${displayMode ? light : dark}`}
    >
      <ToggleButton />
      {/* <Overview /> */}
      <OverviewUnderWatch />
      {/* <RelatedItems /> */}
      <RelatedItemsUnderWatch />
      {/* <Reviews /> */}
      <ReviewsUnderWatch />
      {/* <QuestionsAndAnswers /> */}
      <QuestionsAndAnswersUnderWatch />
    </div>
  );
};

export default ProductDetailPage;
