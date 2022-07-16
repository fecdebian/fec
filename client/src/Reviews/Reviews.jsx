/** @jsx jsx */
// import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
// import { useRecoilValue } from 'recoil';
// import axios from 'axios';

import ReviewList from './ReviewList';
import SubmitReview from './SubmitReview';
import { ReviewsProvider } from './ReviewsContext';
// import MovingDot from './MovingDot';

// Only in production
// import currentProduct from '../currentProduct';

export default function Reviews() {
  // Only in production
  // const prod = useRecoilValue(currentProduct);
  // const [reviews, setReviews] = useState([]);

  // Only in production
  useEffect(() => {
    let ignore = false;

    axios.get(`/reviews?product_id=${prod.id}`)
      .then((res) => {
        if (!ignore) {
          setReviews(res.data.results);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      ignore = true;
    };
  }, [prod]);

  // Only in production
  // return reviews && (
  return (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
      `}
    >
      <ReviewsProvider>
        <ReviewList />
        <SubmitReview />
      </ReviewsProvider>
    </div>
  );
}
