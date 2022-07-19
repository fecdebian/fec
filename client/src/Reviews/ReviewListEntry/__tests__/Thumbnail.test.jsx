import '@testing-library/jest-dom';
import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';

import Thumbnail from '../Thumbnail';
import sampleReviews from '../../sampleReviews';

const { photos } = sampleReviews.results[4];

afterEach(cleanup);

describe('Thumbnail', () => {
  it('renders Thumbnail', () => {
    render(<Thumbnail photo={photos[0]} />);

    screen.debug();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
