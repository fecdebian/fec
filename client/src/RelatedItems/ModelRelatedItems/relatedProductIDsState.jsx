import { atom } from 'recoil';

const relatedProductIDsState = atom({
  key: 'relatedProductIDsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default relatedProductIDsState;
