import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import withList from './HOC/WithList';
import RelatedProductsCards from './RelatedProductsList';
import currentProductState from '../currentProduct';
import Outfit from './OurfitList';

const RelatedProductList = withList(RelatedProductsCards);
const OutfitList = withList(Outfit);

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
    <>
      <h2>More in Related Items</h2>
      <RelatedProductList currentProductDetail={currentProductDetail} />
      <h2>Your Outfit</h2>
      <OutfitList currentProductDetail={currentProductDetail} />
    </>
  );
}
