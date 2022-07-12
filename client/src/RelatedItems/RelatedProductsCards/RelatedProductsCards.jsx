import React from 'react';
import { useRecoilState } from 'recoil';
import ProductCard from './ProductCard';
import currentProductState from '../../currentProduct';

export default function RelatedProductsCards() {
  const [currentProduct] = useRecoilState(currentProductState);
  console.log('render');
  console.log(currentProduct.name);
  return (
    <div>
      RelatedProductsCards
      {currentProduct.name}
      <ProductCard />
    </div>
  );
}
