import '@testing-library/jest-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';

import ProductDetailPage from '../../ProductDetailPage';

it('renders as loading when API has not fired', () => {
  render(
    <RecoilRoot>
      <ProductDetailPage />
    </RecoilRoot>,
  );

  expect(screen.getByText('loading')).toBeInTheDocument();
});
