/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useReviewsDispatch } from './ReviewsContext';

export default function SearchBy() {
  const dispatch = useReviewsDispatch();

  function handleChange(e) {
    dispatch({
      type: 'search_by',
      value: e.target.value,
    });
  }

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Search reviews here..."
    />
  );
}
