import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';

import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './Reviews/Reviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import currentProductState from './currentProduct';
<<<<<<< HEAD
import relatedProductIDsState from './RelatedItems/ModelRelatedItems/relatedProductIDsState';
=======
import { questions as questionState } from './QuestionsAndAnswers/atoms';
>>>>>>> 03c111dfa7a3e07f979f0547241e2a4c4918d599

// Huzzah for jsx!
const ProductDetailPage = function WhateverStupidName() {
  const [currentProduct, setCurrentProduct] = useRecoilState(currentProductState);
<<<<<<< HEAD
  const setRelatedProductIDs = useSetRecoilState(relatedProductIDsState);
=======
  const [questions, setQuestions] = useRecoilState(questionState);
>>>>>>> 03c111dfa7a3e07f979f0547241e2a4c4918d599

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
        const getMetaReview = axios({
          method: 'get',
          url: '/reviews/meta',
          params: { product_id: id },
        });
        const getQuestions = axios({
          method: 'get',
          url: '/qa/questions',
          params: { product_id: id },
        });
        const getRelatedProducts = axios({
          method: 'get',
          url: `/products?product_id=${id}/related`,
          params: { product_id: id },
        });
        return Promise.all([getMetaReview, getQuestions, getRelatedProducts]);
      })
      .then((responses) => {
<<<<<<< HEAD
        responses.forEach((res) => {
          console.log(res.data);
        });
        setRelatedProductIDs(responses[2].data);
=======
        setQuestions(responses[1].data.results);
>>>>>>> 03c111dfa7a3e07f979f0547241e2a4c4918d599
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
