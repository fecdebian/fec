import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import withList from './HOC/WithList';
import RelatedProductsCards from './RelatedProductsList';
import currentProductState from '../currentProduct';

const RelatedProductList = withList(RelatedProductsCards);

export default function RelatedItems() {
  const currentProduct = useRecoilValue(currentProductState);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProductDetail, setCurrentProductDetail] = useState({});

  useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${currentProduct.id}`,
    }).then((product) => {
      setCurrentProductDetail(product.data);
      setIsLoaded(true);
    }).catch((err) => {
      setError(err);
      throw err;
    });
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>More in Related Items</h2>
      <RelatedProductList currentProductDetail={currentProductDetail} />
      <h2>Your Outfit</h2>
    </div>
  );
}
