import React from 'react';
import RelatedProductsCards from './RelatedProductsCards/RelatedProductsCards';
import withList from './HOC_List/WithList';

export default function RelatedItems() {
  return (
    <div>
      {/* <RelatedProductsCards /> */}
      <h2>More in Related Items</h2>
      {withList()}
    </div>
  );
}
