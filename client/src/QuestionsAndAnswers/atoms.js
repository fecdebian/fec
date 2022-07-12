import { atom } from 'recoil';

export const questionsState = atom({
  key: 'questionsState',
  default: [],
});

export const pageState = atom({
  key: 'pageState',
  default: '1',
});

export const countState = atom({
  key: 'countState',
  default: '4',
});

export const sortedQuestionsState = atom({
  key: 'sortedQuestionsState',
  default: [],
});
