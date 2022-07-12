import React from 'react';
import { useRecoilValue } from 'recoil';
import ProductCard from './ProductCard';
import relatedProductIDsState from '../ModelRelatedItems/relatedProductIDsState';

export default function RelatedProductsCards() {
  const reladtedProductIDs = useRecoilValue(relatedProductIDsState);
  console.log(reladtedProductIDs);

  return (
    <div>
      RelatedProductsCards
      <ProductCard />
    </div>
  );
}
