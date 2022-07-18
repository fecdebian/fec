/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';

import currentProductState from '../../currentProduct';
import relatedProductsState from '../ModelRelatedItems/relatedProductsState';
import withCard from '../HOC/ProductCard/ProductCard';
import withStarButton from './WithStarButton';

export default function RelatedProductsCards() {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProducts, setRelatedProducts] = useRecoilState(relatedProductsState);
  const [currentProductDetail, setCurrentProductDetail] = useState({});
  // const [show, setShow] = useState(false);

  const WithStarButton = withStarButton();
  const ProductCard = withCard(WithStarButton);

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
        // console.log('id ', id);
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
      // if (products.length < 7) {
      //   setRightButtonOpacity({ opacity: '0' });
      // }
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
        (product) => (
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
            <ProductCard
              selectedProduct={product}
              mainProduct={currentProductDetail}
            />
          </div>
        ),
      )}
    </>
  );
}
