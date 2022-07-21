import '@testing-library/jest-dom';
import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import ProductImage from '../ProductImage';

const product = {
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

afterEach(cleanup);

test('should render component', async () => {
  render(<ProductImage currentProduct={product} />);
  const imagElement = screen.getByText('Loading...');
  expect(imagElement).toBeInTheDocument();

  expect(imagElement).toBeInTheDocument();
});
