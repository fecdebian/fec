import { atom } from 'recoil';

const currentProductState = atom({
  key: 'currentProductState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export default currentProductState;
