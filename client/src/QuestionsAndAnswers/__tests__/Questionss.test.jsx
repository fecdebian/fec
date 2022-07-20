import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import QuestionsAndAnswers from '../QuestionsAndAnswers';

jest.mock('axios');

describe('PDP', () => {
  it('fetches data and renders app', async () => {
    const sampleProduct = [{
      id: 37311,
      campus: 'hr-rfe',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
      created_at: '2021-08-13T14:37:33.145Z',
      updated_at: '2021-08-13T14:37:33.145Z',
    }];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: sampleProduct }));

    render(
      <RecoilRoot>
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    screen.debug();
    const header = await screen.findByText('Product Name:');
    expect(header).toBeInTheDocument();
  });
});
