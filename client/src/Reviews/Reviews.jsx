/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import ReviewList from './ReviewList';
import SubmitReview from './SubmitReview';

import currentProduct from '../currentProduct';

export default function Reviews() {
  const prod = useRecoilValue(currentProduct);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/reviews?product_id=${prod.id}`)
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => console.error(err));
  }, [prod]);

  return reviews && (
    <div
      css={css`
        padding: 10px;
        margin: 10px;
        border: solid black 2px;
      `}
    >
      <ReviewList reviewEntries={reviews} />
      <SubmitReview />
    </div>
  );
}
