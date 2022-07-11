import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questions as questionsAtom, productID as productIDAtom, page as pageAtom, count as countAtom,
} from './atoms';
import Question from './Question';

function QuestionsList() {
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  const productID = useRecoilValue(productIDAtom);
  const page = useRecoilValue(pageAtom);
  const count = useRecoilValue(countAtom);

  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID}&page=${page}&count=${count}`)
      .then((res) => {
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, [productID, page, count]);
  return (
    <ul>
      {questions.map((question) => <Question key={question.question_id} question={question} />)}
    </ul>
  );
}
export default QuestionsList;
