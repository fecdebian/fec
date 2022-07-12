import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questionsState, sortedQuestionsState, pageState, countState,
} from './atoms';
import currentProductState from '../currentProduct';
import Question from './Question';

function QuestionsList() {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [sortedQuestions, setSortedQuestions] = useRecoilState(sortedQuestionsState);
  const productID = useRecoilValue(currentProductState);
  const page = useRecoilValue(pageState);
  const count = useRecoilValue(countState);

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

  useEffect(() => {
    if (!productID.id) {
      return;
    }
    axios.get(`/qa/questions?product_id=${productID.id}&page=${page}&count=${count}`)
      .then((res) => {
        console.log('successful GET questions request');
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, [count, page, productID]);

  useEffect(() => {
    const copyQuestions = [...questions];
    setSortedQuestions(quickSort(copyQuestions));
  }, [questions]);

  return (
    <ul>
      {/* eslint-disable-next-line max-len */}
      {sortedQuestions.map((question) => <Question key={question.question_id} question={question} />)}
    </ul>
  );
}
export default QuestionsList;
