import React from 'react';
import { RecoilRoot } from 'recoil';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SubmitReview from '../SubmitReview';

describe('SubmitReview', () => {
  test('renders SubmitReview', async () => {
    const user = userEvent.setup();

    render(
      <RecoilRoot>
        <SubmitReview />
      </RecoilRoot>,
    );

    await user.click(screen.getByLabelText(/review body/i));
    // fireEvent
    //   .change(screen.getByRole('textbox', { name: 'Review Body* Minimum required characters left:50' }), {
    //     target: { value: 'Javascript' },
    //   });

    screen.debug();

    // expect(screen.getByText(/Java/)).toBeInTheDocument();
  });
});
