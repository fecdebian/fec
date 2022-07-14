/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Answers from './Answers';

function Question({ question }) {
  const [clicked, setClicked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      axios.put(`/qa/questions/${question.question_id}/helpful`)
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <li>
      <div>
        {'Q: '}
        <span>{question.question_body}</span>
        <span>
          {' Helpful? '}
          <button type="button" onClick={handleClick}>Yes</button>
          {' ('}
          <span>{clicked ? question.question_helpfulness + 1 : question.question_helpfulness}</span>
          {') | '}
          <button type="button">Add Answer</button>
        </span>
      </div>
      <Answers key={question.question_id} question={question} />
    </li>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number,
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    question_helpfulness: PropTypes.number,
    reported: PropTypes.bool,
    answers: PropTypes.shape({}),
  }).isRequired,
};
export default Question;
