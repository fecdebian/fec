/** @jsx jsx */
import { useState, useEffect, useCallback } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import ReviewList from './ReviewList';
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

  const handleClick = useCallback(() => {
    setReviewForm(!reviewForm);
  }, [reviewForm]);

  return reviews && (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        grid-template-rows: repeat(1, 1fr);
      `}
    >
      <ReviewsProvider productReviews={reviews}>
        <div
          css={css`
            grid-column: 2 / 4;
            grid-row: 1 / 5;
          `}
        >
          <SortBy
            css={css`
          `}
          />
          <ReviewList />
          <button
            type="button"
            onClick={handleClick}
            css={css`
              grid-column: 3;
              grid-row: 1;
            `}
          >
            Add a review
          </button>
          <span>{reviewForm ? <SubmitReview handleExit={handleClick} /> : null}</span>
        </div>
        <div
          css={css`
        grid-column: 1;
        grid-row: 1;
      `}
        >
          <RatingBreakdown
            css={css`
              grid-column: 1;
              grid-row: 1;
            `}
          />
          <SearchBy
            css={css`
          grid-column: 1;
          grid-row: 3;
        `}
          />
        </div>
      </ReviewsProvider>
    </div>
  );
}
