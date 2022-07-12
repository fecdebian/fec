import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import Overview from "./Overview/Overview";
import RelatedItems from "./RelatedItems/RelatedItems";
import Reviews from "./Reviews/Reviews";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers";
import currentProductState from "./currentProduct";

// Huzzah for jsx!
const ProductDetailPage = function WhateverStupidName() {
  const [currentProduct, setCurrentProduct] =
    useRecoilState(currentProductState);

  let id;

  useEffect(() => {
    axios
      .get("./products")
      .then((response) => {
        setCurrentProduct(response.data[0]);
        id = response.data[0].id;
      })
      .then(() => {
        console.log('currentProduct.id', id);
        const getMetaReview = axios({
          method: "get",
          url: "/reviews/meta",
          params: { product_id: id },
        });
        const getQuestions = axios({
          method: "get",
          url: "/qa/questions",
          params: { product_id: id },
        });
        return Promise.all([getMetaReview, getQuestions]);
      })
      .then((responses) => {
        responses.forEach((res) => {
          console.log(res.data);
        });
      })
      .catch((err) => {
        console.error("Unable to get product from server ", err);
      });
  }, []);

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
