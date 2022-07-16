import { atom } from 'recoil';

export const currentProductStyles = atom({
  key: 'currentProductStyles',
  default: {},
});

export const selectedProductStyle = atom({
  key: 'selectedProductStyle',
  default: {},
});

export const selectedSize = atom({
  key: 'selectedSize',
  default: 'Select Size',
});

export const selectedQuant = atom({
  key: 'selectedQuant',
  default: 1,
});
