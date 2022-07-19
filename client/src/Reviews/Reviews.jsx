/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import ReviewList from './ReviewList';
import SubmitReview from './SubmitReview';
import SortBy from './SortBy';
import { ReviewsProvider } from './ReviewsContext';
import RatingBreakdown from './RatingBreakdown';

import currentProduct from '../currentProduct';

export default function Reviews() {
  const prod = useRecoilValue(currentProduct);
  const [reviews, setReviews] = useState();

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

  return reviews && (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
      `}
    >
      <RatingBreakdown />
      <ReviewsProvider productReviews={reviews}>
        <SortBy />
        <ReviewList />
        <SubmitReview />
      </ReviewsProvider>
    </div>
  );
}
