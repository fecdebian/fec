/* eslint-disable max-len */
import '@testing-library/jest-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionsAndAnswers from '../QuestionsAndAnswers';
import AddQuestion from '../AddQuestion';
import mockSampleData from '../sampleData';
import { questionsState, questionFormState } from '../atoms';
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
describe('More Answered Questions Button', () => {
  it('should render two more questions when clicked', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Should only display two questions to start
    const moreQuestions = screen.queryByText('More Answered Questions');
    const visibleQuestions = screen.getAllByTestId('question');
    expect(visibleQuestions).toHaveLength(2);
    // Clicking should update # of visible questions from 2 to 4
    await userEvent.click(moreQuestions);
    const updatedVisibleQuestions = screen.getAllByTestId('question');
    expect(updatedVisibleQuestions).toHaveLength(4);
  });
  it('should not render button when there are no remaining questions', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 5));
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Should only display two questions to start
    const moreQuestions = screen.queryByText('More Answered Questions');
    const visibleQuestions = screen.getAllByTestId('question');
    expect(visibleQuestions).toHaveLength(2);
    // Clicking should update # of visible questions from 2 to 4
    await userEvent.click(moreQuestions);
    const updatedVisibleQuestions = screen.getAllByTestId('question');
    expect(updatedVisibleQuestions).toHaveLength(4);
    await userEvent.click(moreQuestions);
    const secondUpdatedVisibleQuestions = screen.getAllByTestId('question');
    expect(secondUpdatedVisibleQuestions).toHaveLength(5);
    expect(moreQuestions).not.toBeInTheDocument();
  });
});
describe('More Answers Button', () => {
  it('should render all remaining answers when clicked', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Should only display two questions to start
    const moreQuestions = screen.queryByText('See More Answers');
    const visibleQuestions = screen.getAllByTestId('answer');
    expect(visibleQuestions).toHaveLength(3);
    // Clicking should update # of visible questions from 2 to 4
    await userEvent.click(moreQuestions);
    const updatedVisibleQuestions = screen.getAllByTestId('answer');
    expect(updatedVisibleQuestions).toHaveLength(5);
  });
  it('should toggle button text each time it is clicked', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 2));
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    // Should only display the answers of first two questions to start
    const moreAnswers = screen.queryByText('See More Answers');
    const visibleAnswers = screen.getAllByTestId('answer');
    expect(visibleAnswers).toHaveLength(3);
    // Clicking should render all answers for a given question
    await userEvent.click(moreAnswers);
    const updatedVisibleAnswers = screen.getAllByTestId('answer');
    expect(updatedVisibleAnswers).toHaveLength(5);
    expect(screen.queryByText('Collapse Answers')).toBeInTheDocument();
    // Text should change to Collapse Questions, clicking brings view back to 1st 2 answers
    const collapseQuestions = screen.queryByText('Collapse Answers');
    await userEvent.click(collapseQuestions);
    const collapsedVisibleQuestions = screen.getAllByTestId('answer');
    expect(collapsedVisibleQuestions).toHaveLength(3);
    expect(screen.queryByText('See More Answers')).toBeInTheDocument();
  });
});
describe('Add Question Modal', () => {
  it('should open add question modal', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 2));
        snap.set(currentProductState, { id: 37311 });
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    const addQuestion = screen.queryByText('Add Question');
    await userEvent.click(addQuestion);
    const questionField = screen.queryByLabelText('Your Question*');
    expect(questionField).toBeRequired();
    const nameField = screen.queryByTestId('q-name');
    expect(nameField).toBeRequired();
    const emailField = screen.queryByTestId('q-mail');
    expect(emailField).toBeRequired();
    const exit = screen.queryAllByText('X')[2];
    await userEvent.click(exit);
  });
  it('should allow submissions when all fields are filled, with invalid email', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 2));
        snap.set(currentProductState, { id: 37311 });
        snap.set(questionFormState, true);
      }}
      >
        <AddQuestion />
      </RecoilRoot>,
    );

    const addQuestion = screen.queryByText('Add Question');
    await userEvent.click(addQuestion);
    const questionField = screen.queryByTestId('q-question');
    await userEvent.type(questionField, 'test');
    const nameField = screen.queryByTestId('q-name');
    await userEvent.type(nameField, 'test');
    expect(nameField.value).toBe('test');
    const emailField = screen.queryByTestId('q-mail');
    await userEvent.type(emailField, 'test');
    const submitField = screen.queryByTestId('q-submit');
    await fireEvent.submit(submitField, { target: { question: { value: 'test question' }, email: { value: 'test' }, body: { value: 'test' } } });
    const err = screen.queryByText('Error: must provide a valid email.');
    expect(err).toBeInTheDocument();
  });
  it('should allow submissions when all fields are filled, with valid email', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 2));
        snap.set(currentProductState, { id: 37311 });
        snap.set(questionFormState, true);
      }}
      >
        <AddQuestion />
      </RecoilRoot>,
    );

    const addQuestion = screen.queryByText('Add Question');
    await userEvent.click(addQuestion);
    const questionField = screen.queryByTestId('q-question');
    await userEvent.type(questionField, 'test');
    const nameField = screen.queryByTestId('q-name');
    await userEvent.type(nameField, 'test');
    expect(nameField.value).toBe('test');
    const emailField = screen.queryByTestId('q-mail');
    await userEvent.type(emailField, 'test@mail.com');
    const submitField = screen.queryByTestId('q-submit');
    await fireEvent.submit(submitField, {
      target: {
        body: { value: 'test question' },
        email: { value: 'test@mail.com' },
        nickname: { value: 'test' },
      },
    });
    const err = screen.queryByText('Error: must provide a valid email.');
    expect(err).not.toBeInTheDocument();
  });
});
describe('Add Answer Modal', () => {
  global.URL.createObjectURL = jest.fn();
  it('should open add answer modal', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 1));
        snap.set(currentProductState, { id: 37311 });
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    const addAnswer = screen.queryByText('Add Answer');
    await userEvent.click(addAnswer);
    const answerField = screen.queryByLabelText('Your Answer*');
    expect(answerField).toBeRequired();
    const nameField = screen.queryByTestId('a-name');
    expect(nameField).toBeRequired();
    const emailField = screen.queryByTestId('a-email');
    expect(emailField).toBeRequired();
    const picField = screen.queryByTestId('a-file');
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const secondFakeFile = new File(['sup'], 'sup.png', { type: 'image/png' });
    const thirdFakeFile = new File(['ay'], 'ay.png', { type: 'image/png' });
    const fourthFakeFile = new File(['yo'], 'yo.png', { type: 'image/png' });
    const fifthFakeFile = new File(['hi'], 'hi.png', { type: 'image/png' });
    const sixthFakeFile = new File(['howdy'], 'howdy.png', { type: 'image/png' });
    const photoArr = [fakeFile, secondFakeFile, thirdFakeFile, fourthFakeFile, fifthFakeFile, sixthFakeFile];
    await userEvent.upload(picField, photoArr);
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(6);
    const submitField = screen.queryByTestId('a-submit');
    await fireEvent.submit(submitField, {
      target: {
        body: { value: 'test question' },
        email: { value: 'test@mail.com' },
        nickname: { value: 'test' },
        filename: { value: photoArr },
      },
    });
    await userEvent.click(addAnswer);
    const exit = screen.queryAllByText('X')[0];
    await userEvent.click(exit);
  });
  it('should allow submissions when all fields are filled, with invalid email', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 1));
        snap.set(currentProductState, { id: 37311 });
        snap.set(questionFormState, true);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    const addAnswer = screen.queryByText('Add Answer');
    await userEvent.click(addAnswer);
    const answerField = screen.queryByTestId('a-answer');
    await userEvent.type(answerField, 'test');
    const nameField = screen.queryByTestId('a-name');
    await userEvent.type(nameField, 'test');
    expect(nameField.value).toBe('test');
    const emailField = screen.queryByTestId('a-email');
    await userEvent.type(emailField, 'test');
    const submitField = screen.queryByTestId('a-submit');
    await fireEvent.submit(submitField, {
      target: {
        body: { value: 'test question' },
        email: { value: 'test' },
        nickname: { value: 'test' },
        filename: { value: '' },
      },
    });
    const err = screen.queryByText('Error: must provide a valid email.');
    expect(err).toBeInTheDocument();
  });
  it('should allow submissions when all fields are filled, with valid email', async () => {
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(questionsState, mockSampleData.slice(0, 1));
        snap.set(currentProductState, { id: 37311 });
        snap.set(questionFormState, true);
      }}
      >
        <QuestionsAndAnswers />
      </RecoilRoot>,
    );

    const addAnswer = screen.queryByText('Add Answer');
    await userEvent.click(addAnswer);
    const answerField = screen.queryByTestId('a-answer');
    await userEvent.type(answerField, 'test');
    const nameField = screen.queryByTestId('a-name');
    await userEvent.type(nameField, 'test');
    expect(nameField.value).toBe('test');
    const emailField = screen.queryByTestId('a-email');
    await userEvent.type(emailField, 'test@mail.com');
    const submitField = screen.queryByTestId('a-submit');
    await fireEvent.submit(submitField, {
      target: {
        body: { value: 'test question' },
        email: { value: 'test@mail.com' },
        nickname: { value: 'test' },
        filename: { value: '' },
      },
    });
    const err = screen.queryByText('Error: must provide a valid email.');
    expect(err).not.toBeInTheDocument();
  });
});
