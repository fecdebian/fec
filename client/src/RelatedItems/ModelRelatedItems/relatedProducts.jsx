import { atom } from 'recoil';

const relatedProductsState = atom({
  key: 'relatedProductsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default relatedProductsState;
