import React from 'react';
import withList from './HOC/WithList/withList';
import RelatedProductsCards from './RelatedProductsList/RelatedProductsCards';

const RelatedProductList = withList(RelatedProductsCards);

export default function RelatedItems() {
  return (
    <div>
      <h2>More in Related Items</h2>
      <RelatedProductList />
      <h2>Your Outfit</h2>
    </div>
  );
}
