import { atom } from 'recoil';

export const questionsState = atom({ // all questions for a given product
  key: 'questionsState',
  default: [],
});

export const sortedQuestionsState = atom({ // all questions sorted by helpfulness
  key: 'sortedQuestionsState',
  default: [],
});

export const questionsViewState = atom({ // questions currently displayed on the DOM
  key: 'questionsViewState',
  default: [],
});

export const moreQuestionsState = atom({ // more answered questions button, +2 when clicked
  key: 'moreQuestionsState',
  default: 2,
});

export const anyResultsState = atom({
  key: 'anyResultsState',
  default: true,
});

export const searchedLengthState = atom({
  key: 'searchedLengthState',
  default: 0,
});
