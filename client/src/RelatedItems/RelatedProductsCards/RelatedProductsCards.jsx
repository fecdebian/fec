import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';

import ProductCard from './ProductCard';
import currentProductState from '../../currentProduct';
import relatedProductsState from '../ModelRelatedItems/relatedProductsState';

export default function RelatedProductsCards() {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProducts, setRelatedProducts] = useRecoilState(relatedProductsState);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${currentProduct.id}/related`,
      params: { product_id: currentProduct.id },
    }).then((res) => {
      const relatedProductsRequests = [];
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
      const relatedProductsCopy = [];
      products.forEach((product) => {
        relatedProductsCopy.push(product.data);
      });
      setRelatedProducts(relatedProductsCopy);
    }).catch((err) => {
      console.log('Unable to get related product id from server ', err);
    });
  }, []);

  useEffect(() => {
    console.log('2nd related products', relatedProducts);
  }, [relatedProducts]);
  if (relatedProducts.length === 0) {
    return <div>Products Card Loading...</div>;
  }

  return (
    <div>
      RelatedProductsCards
      <ul>
        {relatedProducts.map(
          (product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ),
        )}
      </ul>

    </div>
  );
}
