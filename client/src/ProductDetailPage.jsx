import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import Overview from './Overview/OverviewParent';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import currentProductState from './currentProduct';
import { questions as questionState } from './QuestionsAndAnswers/atoms';

// Huzzah for jsx!
const ProductDetailPage = function WhateverStupidName() {
  const [currentProduct, setCurrentProduct] = useRecoilState(currentProductState);
  const [questions, setQuestions] = useRecoilState(questionState);

  let id;

  useEffect(() => {
    axios
      .get('./products')
      .then((response) => {
        setCurrentProduct(response.data[0]);
        id = response.data[0].id;
      })
      .then(() => {
        console.log('currentProduct.id', id);

        const getQuestions = axios({
          method: 'get',
          url: '/qa/questions',
          params: { product_id: id },
        });
        return Promise.all([getQuestions]);
      })
      .then((responses) => {
        setQuestions(responses[1].data.results);
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
