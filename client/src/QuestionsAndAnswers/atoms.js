import { atom } from 'recoil';

export const questions = atom({
  key: 'questions',
  default: [],
});

export const productID = atom({
  key: 'productID',
  default: '37313',
});

export const page = atom({
  key: 'page',
  default: '1',
});

export const count = atom({
  key: 'count',
  default: '4',
});
