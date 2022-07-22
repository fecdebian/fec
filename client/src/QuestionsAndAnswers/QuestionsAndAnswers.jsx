/* eslint-disable max-len */
/** @jsx jsx */
import { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  questionsState, anyResultsState, sortedQuestionsState, questionsViewState, moreQuestionsState, questionFormState, updateQuestionsState,
} from './atoms';
import currentProductState from '../currentProduct';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestions';
import AddQuestion from './AddQuestion';

function QuestionsAndAnswers() {
  const anyResults = useRecoilValue(anyResultsState);
  const productID = useRecoilValue(currentProductState);
  const updateQuestions = useRecoilValue(updateQuestionsState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [sortedQuestions, setSortedQuestions] = useRecoilState(sortedQuestionsState);
  const setQuestionsView = useSetRecoilState(questionsViewState);
  const setMoreQuestions = useSetRecoilState(moreQuestionsState);
  const [questionForm, setQuestionForm] = useRecoilState(questionFormState);

  // sorting questions from most to least helpful
  function quickSort(origArray) {
    if (origArray.length <= 1) {
      return origArray;
    }
    const left = [];
    const right = [];
    const newArray = [];
    const pivot = origArray.pop();
    const { length } = origArray;

    for (let i = 0; i < length; i += 1) {
      if (origArray[i].question_helpfulness <= pivot.question_helpfulness) {
        right.push(origArray[i]);
      } else {
        left.push(origArray[i]);
      }
    }
    return newArray.concat(quickSort(left), pivot, quickSort(right));
  }

  // getting list of questions given product ID
  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID.id}&page=${1}&count=${10000}`) // does count need to be in state? Not sure yet
      .then((res) => {
        console.log('successful GET questions request');
        console.log(res.data.results);
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, [productID, updateQuestions]);

  // sort list of questions by most to least helpful
  useEffect(() => {
    const copyQuestions = [...questions];
    setSortedQuestions(quickSort(copyQuestions));
  }, [questions]);

  // set state for the More Answered Questions button logic
  useEffect(() => {
    const copySortedQuestions = [...sortedQuestions];
    setMoreQuestions((copySortedQuestions.length - 2));

    // sets default displayed questions
    setQuestionsView(copySortedQuestions.slice(0, 2));
  }, [sortedQuestions]);

  // toggles Add Question modal
  function handleClick(e) {
    e.preventDefault();
    console.log(questionForm);
    setQuestionForm(!questionForm);
  }

  return (
    <div>
      <div css={css`
          display: flex;
          justify-content: flex-start;
          font-size: 20px;
          padding: 10px;
        `}
      >
        Questions And Answers
      </div>
      <span>
        <SearchQuestions />
      </span>
      {anyResults ? <QuestionsList /> : 'No questions found...'}
      <span css={css`
          display: inline;
          margin: 5px;
        `}
      >
        <button onClick={handleClick} type="button">Add Question</button>
      </span>
      <span><AddQuestion /></span>
      <br />
    </div>
  );
}
export default QuestionsAndAnswers;
