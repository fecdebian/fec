import React from 'react';
import RelatedProductsCards from './RelatedProductsCards/RelatedProductsCards';
import Outfit from './OutFitList/OutFixList';

export default function RelatedItems() {
  return (
    <div>
      <h2>More in Related Items</h2>
      <RelatedProductsCards />
      <h2>Your Outfit</h2>
      {/* <Outfit /> */}
    </div>
  );
}
