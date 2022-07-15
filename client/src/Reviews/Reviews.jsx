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
  // useEffect(() => {
  //   axios.get(`/reviews?product_id=${prod.id}`)
  //     .then((res) => {
  //       setReviews(res.data.results);
  //     })
  //     .catch((err) => console.error(err));
  // }, [prod]);

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
