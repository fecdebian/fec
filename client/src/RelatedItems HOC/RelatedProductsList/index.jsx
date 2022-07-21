/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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
      throw err;
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
            <StyledProductContainer
              key={product.id}
            >
              <ProductCard />
            </StyledProductContainer>
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

/* ===========    CSS Styled Components   =========== */
const StyledProductContainer = styled.div`
  flex: 0 0 160;
  border-sizing: border-box;
  width:160;
  padding:0.25rem;
  margin-left: 30px;
  position:relative;`;
