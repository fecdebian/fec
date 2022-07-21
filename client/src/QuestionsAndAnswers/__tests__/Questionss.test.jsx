import '@testing-library/jest-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import QuestionsAndAnswers from '../QuestionsAndAnswers';
import mockSampleData from '../sampleData';
import { questionsState } from '../atoms';
import currentProductState from '../../currentProduct';

describe('Q&A Landing Page', () => {
  it('should not display "No questions found" when given data', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
        snap.set(currentProductState, { id: 37311 });
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    expect(screen.queryByText('No Questions Found...')).not.toBeInTheDocument();
  });
  it('should display "No questions found" without data', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, []);
        snap.set(currentProductState, { id: 37311 });
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    expect(screen.queryByText('No Questions Found...')).toBeInTheDocument();
  });
});
describe('Search Bar', () => {
  it('should contain a search bar that updates displayed questions', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    expect(screen.queryByPlaceholderText('Have a question? Search for answers... (case-sensitive)')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'deb');
    expect(screen.getByRole('textbox')).toHaveValue('deb');
  });
  it('should display questions matching the search terms', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    await userEvent.type(screen.getByRole('textbox'), 'deb');
    expect(screen.getByRole('textbox')).toHaveValue('deb');
    expect(screen.queryByText('Q: debiann')).toBeInTheDocument();
  });
  it('should not display questions that do not match search term', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    await userEvent.type(screen.getByRole('textbox'), 'abc');
    expect(screen.queryByText('Q: debiann')).not.toBeInTheDocument();
  });
});
describe('Question buttons', () => {
  it('should update displayed Helped quantity', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Get Yes button for 1st question, and value of Helpfulness. Should be 4
    const firstHelp = screen.getAllByText('Yes')[0];
    const firstHelpNum = screen.getAllByTestId('helpful')[0].textContent;
    expect(firstHelpNum).toBe('4');
    // Clicking should update text value from 4 to 5
    await userEvent.click(firstHelp);
    const updatedFirstHelpNum = screen.getAllByTestId('helpful')[0].textContent;
    expect(updatedFirstHelpNum).toBe('5');
    // Clicking again should not update (can only occur once per user)
    await userEvent.click(firstHelp);
    const attemptedFirstHelpNum = screen.getAllByTestId('helpful')[0].textContent;
    expect(attemptedFirstHelpNum).toBe('5');
  });
});
describe('Answer buttons', () => {
  it('should update displayed Helped quantity', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Get Yes button for 1st question, and value of Helpfulness. Should be 4
    const firstHelp = screen.getAllByText('Yes')[1];
    const firstHelpNum = screen.getAllByTestId('answer-helpful')[0].textContent;
    expect(firstHelpNum).toBe('1');
    // Clicking should update text value from 4 to 5
    await userEvent.click(firstHelp);
    const updatedFirstHelpNum = screen.getAllByTestId('answer-helpful')[0].textContent;
    expect(updatedFirstHelpNum).toBe('2');
    // Clicking again should not update (can only occur once per user)
    await userEvent.click(firstHelp);
    const attemptedFirstHelpNum = screen.getAllByTestId('answer-helpful')[0].textContent;
    expect(attemptedFirstHelpNum).toBe('2');
  });
  it('should update Report button text to Reported', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Get Yes button for 1st question, and value of Helpfulness. Should be 4
    const firstHelp = screen.getAllByTestId('report')[0];
    const firstHelpNum = firstHelp.textContent;
    expect(firstHelpNum).toBe('Report');
    // Clicking should update text value from 4 to 5
    await userEvent.click(firstHelp);
    const updatedFirstHelpNum = screen.getAllByTestId('report')[0].textContent;
    expect(updatedFirstHelpNum).toBe('Reported');
    // Clicking again should not update (can only occur once per user)
    await userEvent.click(firstHelp);
    const attemptedFirstHelpNum = screen.getAllByTestId('report')[0].textContent;
    expect(attemptedFirstHelpNum).toBe('Reported');
  });
});
