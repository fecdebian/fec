/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';

import ProductCard from '../../HOC_ProductCard/ProductCard';
import currentProductState from '../../../currentProduct';
import relatedProductsState from '../../ModelRelatedItems/relatedProductsState';
// import Modal from './Modal/Modal';

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
    }).catch((err) => {
      console.log('Unable to get related product id from server ', err);
    });
  }, []);

  if (relatedProducts.length === 0) {
    return <div>Products Card Loading...</div>;
  }

}
