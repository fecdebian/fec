/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';

import currentProductState from '../../currentProduct';
import relatedProductsState from '../ModelRelatedItems/relatedProductsState';
import withCard from '../HOC/ProductCard/WithCard';
import StarButton from './StarButton';

export default function RelatedProductsCards() {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProducts, setRelatedProducts] = useRecoilState(relatedProductsState);
  const [currentProductDetail, setCurrentProductDetail] = useState({});
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const relatedProductsRequests = [];
    axios({
      method: 'get',
      url: `/products/${currentProduct.id}/related`,
      params: { product_id: currentProduct.id },
    }).then((res) => {
      relatedProductsRequests.push(
        axios({
          method: 'get',
          url: `/products/${currentProduct.id}`,
        }),
      );
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
      setCurrentProductDetail(products[0].data);
      const relatedProductsCopy = [];
      products.slice(1).forEach((product) => {
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

  console.log('related Products Cards render');

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
      {/* placeholders */}
      {relatedProducts.map(
        (product) => {
          return (
            <div
              css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  position:relative;
                `}
            >
              PlaceHolder
            </div>
          );
        },
      )}
            {relatedProducts.map(
        (product) => {
          return (
            <div
              css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  position:relative;
                `}
            >
              PlaceHolder
            </div>
          );
        },
      )}
            {relatedProducts.map(
        (product) => {
          return (
            <div
              css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  position:relative;
                `}
            >
              PlaceHolder
            </div>
          );
        },
      )}
    </>
  );
}
