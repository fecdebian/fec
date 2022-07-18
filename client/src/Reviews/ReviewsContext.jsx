import React, { createContext, useContext, useReducer } from 'react';
import Proptypes from 'prop-types';

import sampleReviews from './sampleReviews';

/*  ==========       Initialize           ==========  */

const totalReviews = sampleReviews.results;
let sortedReviews = totalReviews.slice();
let displayedReviews = totalReviews.slice(0, 2);
let reviewsLen = 0;

/*  ==========       Utilities           ==========  */

function reInitializeReviews(rawReviews) {
  displayedReviews = rawReviews.slice(0, 2);
  reviewsLen = 0;
  return displayedReviews;
}

function sortReviewsBy(category) {
  const newReviews = totalReviews.slice();
  if (category === 'helpfulness') {
    return newReviews.sort((a, b) => b.helpfulness - a.helpfulness);
  } if (category === 'newest') {
    return newReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  } if (category === 'relevance') {
    return newReviews;
  }
  throw Error('Unknown category');
}

/*  ==========       Export Context           ==========  */

export const ReviewsContext = createContext(null);
export const ReviewsDispatchContext = createContext(null);
export const ReviewsTotalLengthContext = createContext(0);

/*  ==========       Export useContexts           ==========  */

export function useReviews() {
  return useContext(ReviewsContext);
}

export function useReviewsDispatch() {
  return useContext(ReviewsDispatchContext);
}

export function useReviewsTotalLengthContext() {
  return useContext(ReviewsTotalLengthContext);
}

/*  ==========    Reducer for useReduce hook      ==========  */

function reviewsReducer(reviews, action) {
  switch (action.type) {
    case 'show_more': {
      reviewsLen += 2;
      return [
        ...reviews,
        ...sortedReviews.slice(reviewsLen, reviewsLen + 2),
      ];
    }
    case 'sort_by': {
      sortedReviews = sortReviewsBy(action.value);
      return [
        ...reInitializeReviews(sortedReviews),
      ];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

/*  ==========       Context Provider           ==========  */

export function ReviewsProvider({ children }) {
  const [reviews, dispatch] = useReducer(
    reviewsReducer,
    displayedReviews,
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

ReviewsProvider.propTypes = {
  children: Proptypes.oneOfType([
    Proptypes.element,
    Proptypes.array,
  ]).isRequired,
};
