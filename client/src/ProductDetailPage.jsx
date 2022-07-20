import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import Overview from './Overview/OverviewParent';
// import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import currentProductState from './currentProduct';
import RelatedItems from './RelatedItems HOC';
import withBigBrotherWatching from './SharedComponents/bigBrotherIsWatchingYou';

const OverviewUnderWatch = withBigBrotherWatching(Overview);
const RelatedItemsUnderWatch = withBigBrotherWatching(RelatedItems);
const ReviewsUnderWatch = withBigBrotherWatching(Reviews);
const QuestionsAndAnswersUnderWatch = withBigBrotherWatching(QuestionsAndAnswers);
// Huzzah for jsx!
const ProductDetailPage = function WhateverStupidName() {
  const [currentProduct, setCurrentProduct] = useRecoilState(currentProductState);

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

  return (
    <div>
      <h2>Product Name:</h2>
      <h2>{currentProduct.name}</h2>
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
