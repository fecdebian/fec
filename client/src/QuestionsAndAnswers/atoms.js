import { atom } from 'recoil';

export const questionsState = atom({
  key: 'questionsState',
  default: [],
});

export const countState = atom({
  key: 'countState',
  default: '4',
});

export const sortedQuestionsState = atom({
  key: 'sortedQuestionsState',
  default: [],
});

export const questionsViewState = atom({
  key: 'questionsViewState',
  default: [],
});

export const moreQuestionsState = atom({
  key: 'moreQuestionsState',
  default: 2,
});

export const answersDataState = atom({
  key: 'answersDataState',
  default: {},
});

export const answersState = atom({
  key: 'answersState',
  default: [],
});

export const questionIDState = atom({
  key: 'questionIDState',
  default: 0,
});
