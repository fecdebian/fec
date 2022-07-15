/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import AvgStars from './AvgStars';
import ProductImage from './ProductImage';
import currentMetaReview from '../../SharedComponents/reviewMeta';

export default function ProductsCard({ product }) {
  const currentProductMetaReview = useRecoilValue(currentMetaReview);
  const [isLoaded, setIsLoaded] = useState(false);
  const [avgStars, setAvgStars] = useState(0);
  const [characteristics, setCharacteristics] = useState({});
  const productID = product.id;
  let avgRating = 0;

  const modalButtonHandler = () => {
    console.log('current ', currentProductMetaReview.data.characteristics);
    console.log('selected', characteristics);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { product_id: productID },
    })
      .then((reviews) => {
        setCharacteristics(reviews.data.characteristics);
        const ratingsObj = reviews.data.ratings;
        const ratingsValues = Object.values(ratingsObj);
        const ratingsWeights = Object.keys(ratingsObj);
        let sumOfTotalRatings = 0;
        let sumOfWeightedRatings = 0;

        for (let i = 0; i < ratingsValues.length; i += 1) {
          sumOfTotalRatings += Number(ratingsValues[i]);
        }
        for (let i = 0; i < ratingsWeights.length; i += 1) {
          sumOfWeightedRatings += (ratingsValues[i] * ratingsWeights[i]);
        }

        avgRating = (Math.round(((sumOfWeightedRatings / sumOfTotalRatings) * 4))
          / 4).toFixed(2);
        setIsLoaded(true);
        setAvgStars(avgRating);
      })
      .catch((err) => {
        setIsLoaded(true);
        console.log(err);
      });
  }, []);

  return (
    <>
      <ProductImage currentProduct={product} />
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>
        $
        {product.default_price}
        <button
          type="submit"
          onClick={modalButtonHandler}
          css={css`
            color:gold;
          `}
        >
          &#9733;
        </button>
      </div>
      <AvgStars isLoaded={isLoaded} avgStars={Number(avgStars)} />
    </>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
};
