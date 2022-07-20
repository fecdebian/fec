import '@testing-library/jest-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import QuestionsAndAnswers from '../QuestionsAndAnswers';
import mockSampleData from '../sampleData';
import { questionsState } from '../atoms';
import currentProductState from '../../currentProduct';

describe('Q&A Landing Page', () => {
  it('fetches productID and renders app', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(currentProductState, '37311');
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    screen.debug();
    const header = await screen.findByText('Questions And Answers'); // No Questions found
    expect(header).toBeInTheDocument();
  });
});
