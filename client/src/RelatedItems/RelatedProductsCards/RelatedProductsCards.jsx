import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';

import ProductCard from './ProductCard';
import relatedProductIDsState from '../ModelRelatedItems/relatedProductIDsState';
import currentProductState from '../../currentProduct';

export default function RelatedProductsCards() {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProductIDs, setRelatedProductIDs] = useRecoilState(relatedProductIDsState);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/products?product_id=${currentProduct.id}/related`,
      params: { product_id: currentProduct.id },
    }).then((res) => {
      setRelatedProductIDs(res.data);
    })
      .catch((err) => {
        console.log('Unable to get related product id from server ', err);
      });
  }, []);

  useEffect(() => {
    // console.log('related items are, ', relatedProductIDs);
  }, [relatedProductIDs]);

  return (
    <div>
      RelatedProductsCards
      <ProductCard />
    </div>
  );
}
