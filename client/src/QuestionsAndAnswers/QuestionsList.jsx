import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  const productID = 37313;
  const page = 1;
  const count = 2;

  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID}&page=${page}&count=${count}`)
      .then((res) => {
        setQuestions(res.data.results);
        console.log('successful api req');
      })
      .catch((err) => {
        console.log('error fetching questions:', err);
      });
  }, []);
  return (
    <ul>
      Product ID:
      {questions.map((question) => (
        <li key={question.question_id}>
          Q:
          {question.question_body}
        </li>
      ))}
    </ul>
  );
}
export default QuestionsList;
