import React, { useEffect } from 'react';
import {
  useRecoilValue,
  atom,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import axios from 'axios';

import currentProductState from '../currentProduct';
import currentProductStyles from './productStyles';

function ProductPrice() {
  const currentProduct = useRecoilState(currentProductState);
  const productID = currentProduct[0].id;
  const [productStyles, setProductStyles] = useRecoilState(currentProductStyles);

  return (
    <div>

    </div>
  );
}

export default ProductPrice;
