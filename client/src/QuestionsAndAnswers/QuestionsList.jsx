import React, { useEffect } from 'react';
import axios from 'axios';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const questionsState = atom({
  key: 'questions',
  default: [],
});

export const productIDState = atom({
  key: 'productID',
  default: '37313',
});

export const pageState = atom({
  key: 'page',
  default: '1',
});

export const countState = atom({
  key: 'count',
  default: '4',
});

function QuestionsList() {
  const [questions, setQuestions] = useRecoilState(questionsState);

  const productID = useRecoilValue(productIDState);
  const page = useRecoilValue(pageState);
  const count = useRecoilValue(countState);

  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID}&page=${page}&count=${count}`)
      .then((res) => {
        setQuestions(res.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, []);
  return (
    <ul>
      {questions.map((question) => (
        <li key={question.question_id}>
          <div>
            Q:
            {' '}
            {question.question_body}
            <div>
              <a href="/">Helpful?</a>
              {' '}
              Yes
              {' '}
              {question.question_helpfulness}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default QuestionsList;
