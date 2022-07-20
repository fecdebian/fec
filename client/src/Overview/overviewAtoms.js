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

export const totalQuant = atom({
  key: 'totalQuant',
  default: '1',
});

export const selectedQuant = atom({
  key: 'selectedQuant',
  default: '-',
});

export const selectedSKU = atom({
  key: 'selectedSKU',
  default: '',
});

export const selectedImage = atom({
  key: 'selectedImage',
  default: '',
});

export const selectedImageIndex = atom({
  key: 'selectedImageIndex',
  default: 0,
});
