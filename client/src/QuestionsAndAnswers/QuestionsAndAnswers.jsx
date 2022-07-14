/* eslint-disable max-len */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import currentProductState from '../currentProduct';
import {
  questionsState, anyResultsState, sortedQuestionsState, questionsViewState, moreQuestionsState,
} from './atoms';
import QuestionsList from './QuestionsList';
import SearchQuestions from './SearchQuestions';

function QuestionsAndAnswers() {
  const anyResults = useRecoilValue(anyResultsState);
  const productID = useRecoilValue(currentProductState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [sortedQuestions, setSortedQuestions] = useRecoilState(sortedQuestionsState);
  const setQuestionsView = useSetRecoilState(questionsViewState);
  const setMoreQuestions = useSetRecoilState(moreQuestionsState);

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
    axios.get(`/qa/questions?product_id=${productID.id}&page=${1}&count=${100}`) // does count need to be in state? Not sure yet
      .then((res) => {
        console.log('successful GET questions request');
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.error('error fetching questions:', err);
      });
  }, [productID]);

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

  return (
    <div>
      <h3>Questions And Answers</h3>
      <SearchQuestions />
      <div>{anyResults ? <QuestionsList /> : 'No questions found...'}</div>
    </div>
  );
}
export default QuestionsAndAnswers;
