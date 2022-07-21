/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import ReviewList from './ReviewList';
import SubmitReviewButton from './SubmitReviewButton';
import SortBy from './SortBy';
import { ReviewsProvider } from './ReviewsContext';
import RatingBreakdown from './RatingBreakdown';
import SearchBy from './SearchBy';
import SubmitReview from './SubmitReview';

import currentProduct from '../currentProduct';

export default function Reviews() {
  const prod = useRecoilValue(currentProduct);
  const [reviews, setReviews] = useState();
  const [reviewForm, setReviewForm] = useState(false);

  useEffect(() => {
    let ignore = false;

    axios.get(`/reviews?product_id=${prod.id}&count=300`)
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

  function handleClick() {
    setReviewForm(!reviewForm);
  }

  return reviews && (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
      `}
    >
      <ReviewsProvider productReviews={reviews}>
        <RatingBreakdown />
        <SortBy />
        <SearchBy />
        <ReviewList />
        <button type="button" onClick={handleClick}>Add a review</button >
        <span>{reviewForm ? <SubmitReview handleExit={handleClick} /> : null}</span>
      </ReviewsProvider>
    </div>
  );
}
