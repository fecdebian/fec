import React, { createContext, useContext, useReducer } from 'react';

import sampleReviews from './sampleReviews';

const totalReviews = sampleReviews.results;
const initialReviews = totalReviews.slice(0, 2);

export const ReviewsContext = createContext(null);
export const ReviewsDispatchContext = createContext(null);
export const ReviewsTotalLengthContext = createContext(0);

export function useReviews() {
  return useContext(ReviewsContext);
}

export function useReviewsDispatch() {
  return useContext(ReviewsDispatchContext);
}

export function useReviewsTotalLengthContext() {
  return useContext(ReviewsTotalLengthContext);
}

let reviewsLen = 0;

function reviewsReducer(reviews, action) {
  switch (action.type) {
    case 'show_more': {
      reviewsLen += 2;
      return [
        ...reviews,
        ...totalReviews.slice(reviewsLen, reviewsLen + 2),
      ];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export function ReviewsProvider({ children }) {
  const [reviews, dispatch] = useReducer(
    reviewsReducer,
    initialReviews,
  );

  return (
    <ReviewsContext.Provider value={reviews}>
      <ReviewsDispatchContext.Provider value={dispatch}>
        <ReviewsTotalLengthContext.Provider value={totalReviews.length}>
          {children}
        </ReviewsTotalLengthContext.Provider>
      </ReviewsDispatchContext.Provider>
    </ReviewsContext.Provider>
  );
}
