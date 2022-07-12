import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import currentProductState from './currentProduct';

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
        console.error('Unable to get product from server ', err);
      });
  }, []);

  if (currentProduct.id === undefined) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <h2>Product Name:</h2>
      <h2>{currentProduct.name}</h2>
      <Overview />
      <RelatedItems />
      <Reviews />
      <QuestionsAndAnswers />
    </div>
  );
};

export default ProductDetailPage;
