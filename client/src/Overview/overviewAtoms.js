import { atom } from 'recoil';

export const currentProductStyles = atom({
  key: 'currentProductStyles',
  default: {},
});

export const selectedProductStyle = atom({
  key: 'selectedProductStyle',
  default: {},
});

export const selectedProductSizes = atom({
  key: 'selectedProductStyle',
  default: [],
});
