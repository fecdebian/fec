import React from 'react';

import SizeSelect from './SizeSelect';
import QuantitySelect from './QuantitySelect';
import AddToCart from './AddToCart';

function Cart() {
  return (
    <div>
      <SizeSelect />
      <QuantitySelect />
      {/* <AddToCart /> */}
    </div>
  );
}

export default Cart;
