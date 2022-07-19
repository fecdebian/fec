/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import PropTypes from 'prop-types';

import currentProductState from '../../currentProduct';
import relatedProductsState from '../ModelRelatedItems/relatedProductsState';
import withCard from '../HOC/WithCard';
import StarButton from './StarButton';

export default function RelatedProductsCards({ currentProductDetail }) {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProducts, setRelatedProducts] = useRecoilState(relatedProductsState);

  useEffect(() => {
    const relatedProductsRequests = [];
    axios({
      method: 'get',
      url: `/products/${currentProduct.id}/related`,
      params: { product_id: currentProduct.id },
    }).then((res) => {
      res.data.forEach((id) => {
        relatedProductsRequests.push(
          axios({
            method: 'get',
            url: `/products/${id}`,
          }),
        );
      });
      return Promise.all(relatedProductsRequests);
    }).then((products) => {
      const relatedProductsCopy = [];
      products.forEach((product) => {
        relatedProductsCopy.push(product.data);
      });
      setRelatedProducts(relatedProductsCopy);
    }).catch((err) => {
      console.log('Unable to get related product id from server ', err);
    });
  }, []);

  if (relatedProducts.length === 0) {
    return <div>Products Card Loading...</div>;
  }

  return (
    <>
      {relatedProducts.map(
        (product) => {
          const selectedProduct = product;
          const mainProduct = currentProductDetail;
          const ProductCard = withCard(StarButton, { selectedProduct, mainProduct });
          return (
            <div
              key={product.id}
              css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  position:relative;
                `}
            >
              <ProductCard />
            </div>
          );
        },
      )}
    </>
  );
}

RelatedProductsCards.propTypes = {
  currentProductDetail: PropTypes.shape({
  }).isRequired,
};
