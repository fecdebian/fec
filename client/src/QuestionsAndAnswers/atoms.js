import { atom } from 'recoil';

// all questions for a given product
export const questionsState = atom({
  key: 'questionsState',
  default: [],
});

// all questions sorted by helpfulness
export const sortedQuestionsState = atom({
  key: 'sortedQuestionsState',
  default: [],
});

// questions currently displayed on the DOM
export const questionsViewState = atom({
  key: 'questionsViewState',
  default: [],
});

// more answered questions button, +2 when clicked
export const moreQuestionsState = atom({
  key: 'moreQuestionsState',
  default: 2,
});

// when there's no search results, won't render question list
export const anyResultsState = atom({
  key: 'anyResultsState',
  default: true,
});

// if < 3 characters are in search bar, display More Questions button, or else it won't be rendered
export const searchedLengthState = atom({
  key: 'searchedLengthState',
  default: 0,
});

export const questionFormState = atom({
  key: 'questionFormState',
  default: false,
});

export const updateQuestionsState = atom({
  key: 'updateQuestionsState',
  default: 0,
});
