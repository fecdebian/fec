import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questionsState, sortedQuestionsState, countState, questionsViewState, moreQuestionsState,
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
  const count = useRecoilValue(countState);

  function quickSort(origArray) { // sorting function
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
    axios.get(`/qa/questions?product_id=${productID.id}&page=${1}&count=${100}`)
      .then((res) => {
        console.log('successful GET questions request');
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, [count, productID]);

  useEffect(() => { // sort list of questions by most to least helpful
    const copyQuestions = [...questions];
    setSortedQuestions(quickSort(copyQuestions));
  }, [questions]);

  useEffect(() => {
    const copySortedQuestions = [...sortedQuestions];
    setMoreQuestions((copySortedQuestions.length - 2));
    setQuestionsView(copySortedQuestions.slice(0, 2));
  }, [sortedQuestions]);

  if (questionsView.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <ul>
        {/* eslint-disable-next-line max-len */}
        {questionsView.map((question) => <Question key={question.question_id} question={question} />)}
      </ul>
      <MoreAnsweredQuestions />
    </div>
  );
}
export default QuestionsList;
