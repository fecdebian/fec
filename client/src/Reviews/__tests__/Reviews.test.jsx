import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import ReviewSummary from '../ReviewListEntry/ReviewSummary';
import sampleReviews from '../sampleReviews';

afterEach(cleanup);

it('renders ReviewSummary component', () => {
  render(<ReviewSummary summary={sampleReviews.results[0].summary} />);

  expect(screen.getByText(/model/)).toBeInTheDocument();
});
