/* eslint-disable max-len */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questionsState, sortedQuestionsState, questionsViewState, moreQuestionsState,
} from './atoms';
import currentProductState from '../currentProduct';
import Question from './Question';
import MoreAnsweredQuestions from './MoreAnsweredQuestions';

function QuestionsList() {
  const [questions, setQuestions] = useRecoilState(questionsState); // setting up Recoil hooks
  const [sortedQuestions, setSortedQuestions] = useRecoilState(sortedQuestionsState);
  const [questionsView, setQuestionsView] = useRecoilState(questionsViewState);
  const [moreQuestions, setMoreQuestions] = useRecoilState(moreQuestionsState);
  const productID = useRecoilValue(currentProductState);

  function quickSort(origArray) { // sorting questions from most to least helpful
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

  useEffect(() => { // getting list of questions given product ID
    axios.get(`/qa/questions?product_id=${productID.id}&page=${1}&count=${100}`) // does count need to be in state? Not sure yet
      .then((res) => {
        console.log('successful GET questions request');
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.error('error fetching questions:', err);
      });
  }, [productID]);

  useEffect(() => { // sort list of questions by most to least helpful
    const copyQuestions = [...questions];
    setSortedQuestions(quickSort(copyQuestions));
  }, [questions]);

  useEffect(() => { // set state for the More Answered Questions button logic
    const copySortedQuestions = [...sortedQuestions];
    setMoreQuestions((copySortedQuestions.length - 2));
    setQuestionsView(copySortedQuestions.slice(0, 2)); // sets default displayed questions
  }, [sortedQuestions]);

  return ( // returns mapped list of all viewed questions, + more answered questions button
    <div>
      <ul>
        {questionsView.map((question) => <Question key={question.question_id} question={question} />)}
      </ul>
      <MoreAnsweredQuestions />
    </div>
  );
}
export default QuestionsList;
