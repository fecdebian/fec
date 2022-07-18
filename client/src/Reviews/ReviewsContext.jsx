import React, { createContext, useContext, useReducer } from 'react';
import Proptypes from 'prop-types';

/*  ==========       Initialize           ==========  */

let totalReviews;
let sortedReviews;
let displayedReviews;
let reviewsLen;
let ignore = false;

/*  ==========       Utilities           ==========  */

function reInitializeReviews(rawReviews) {
  displayedReviews = rawReviews.slice(0, 2);
  reviewsLen = 0;
  return displayedReviews;
}

// Fisher-Yates Shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(arr) {
  const array = arr.slice();
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function sortReviewsBy(category) {
  const newReviews = totalReviews.slice();
  if (category === 'helpfulness') {
    return newReviews.sort((a, b) => b.helpfulness - a.helpfulness);
  } if (category === 'newest') {
    return newReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  } if (category === 'relevance') {
    return shuffle(newReviews);
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

export function ReviewsProvider({ productReviews, children }) {
  totalReviews = productReviews;

  // Maybe use useRef hooks??
  if (!ignore) {
    sortedReviews = shuffle(totalReviews.slice());
    displayedReviews = sortedReviews.slice(0, 2);
    reviewsLen = 0;
    ignore = true;
  }

  const [reviews, dispatch] = useReducer(
    reviewsReducer,
    displayedReviews,
  );

  return (
    <ReviewsContext.Provider value={reviews} key={productReviews}>
      <ReviewsDispatchContext.Provider value={dispatch}>
        <ReviewsTotalLengthContext.Provider value={totalReviews.length}>
          {children}
        </ReviewsTotalLengthContext.Provider>
      </ReviewsDispatchContext.Provider>
    </ReviewsContext.Provider>
  );
}

ReviewsProvider.propTypes = {
  productReviews: Proptypes.oneOfType([
    Proptypes.array,
  ]).isRequired,
  children: Proptypes.oneOfType([
    Proptypes.element,
    Proptypes.array,
  ]).isRequired,
};
