import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questions as questionsAtom, page as pageAtom, count as countAtom,
} from './atoms';
import Question from './Question';
import currentProductState from '../currentProduct';

function QuestionsList() {
  const [questions, setQuestions] = useRecoilState(questionsAtom);
  const productID = useRecoilValue(currentProductState);
  const page = useRecoilValue(pageAtom);
  const count = useRecoilValue(countAtom);

  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID.id}&page=${page}&count=${count}`)
      .then((res) => {
        console.log('success');
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, []);

  return (
    <ul>
      {questions.map((question) => <Question key={question.question_id} question={question} />)}
    </ul>
  );
}
export default QuestionsList;
