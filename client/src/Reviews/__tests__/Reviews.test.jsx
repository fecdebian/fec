import '@testing-library/jest-dom';
import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import axios from 'axios';

import App from '../../index';
import ReviewSummary from '../ReviewListEntry/ReviewSummary';

import sampleReviews from '../sampleReviews';

jest.mock('axios');

afterEach(cleanup);

describe('App', () => {
  it('fetches product Id', async () => {
    const productData = {
      id: 37311,
      campus: 'hr-rfe',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
      created_at: '2021-08-13T14:37:33.145Z',
      updated_at: '2021-08-13T14:37:33.145Z',
    };

    axios.get.mockImplementationOnce(() => {
      Promise.resolve([productData]);
    });

    render(<App />);

    await screen.debug();

    // findByRole('SortBy').
  });
});

describe('Summary Component', () => {
  it('renders ReviewSummary component', () => {
    render(<ReviewSummary summary={sampleReviews.results[0].summary} />);

    screen.debug();

    expect(screen.getByText(/model/)).toBeInTheDocument();
  });
});
