/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useReviewsDispatch } from './ReviewsContext';

import BreakdownBars from './BreakdownBars';

export default function Breakdown({ ratings, totalReviews, recommended }) {
  const dispatch = useReviewsDispatch();
  const [filterValue, setFilterValue] = useState(null);
  const recommendedAll = Number(recommended[false]) + Number(recommended[true]);
  let recomPercentage = Number(recommended[true]) / recommendedAll * 100;

  return (
    <div>
      {Object.entries(ratings).map((rating) => (
        <BreakdownBars
          key={rating[0]}
          rating={rating}
          totalReviews={totalReviews}
          handleClick={() => {
            dispatch({
              type: 'filter_by',
              value: rating[0],
            });
            setFilterValue(rating[0]);
          }}
        />
      ))}
      {filterValue && <p>{`Filtering ${filterValue} stars!`}</p>}
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: 'filter_by',
            value: 'remove_all',
          });
        }}
      >
        Remove all filters
      </button>
      <p>{`Recommended by ${recomPercentage.toFixed(1)}%`}</p>
    </div>
  );
}
