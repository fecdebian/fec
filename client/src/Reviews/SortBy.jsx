/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useReviewsDispatch } from './ReviewsContext';

export default function SortBy() {
  const dispatch = useReviewsDispatch();

  function handleChange(e) {
    dispatch({
      type: 'sort_by',
      value: e.target.value,
    });
  }

  return (
    <form>
      <label htmlFor="product-sort-select">
        Sort by:
        {' '}
        <select onChange={handleChange}>
          <option value="relevance">Relevance</option>
          <option value="helpfulness">Helpfulness</option>
          <option value="newest">Newest</option>
        </select>
      </label>
    </form>
  );
}
