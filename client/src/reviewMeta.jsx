import { atom } from 'recoil';

const currentMetaReviewState = atom({
  key: 'currentMetaReviewState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export default currentMetaReviewState;
