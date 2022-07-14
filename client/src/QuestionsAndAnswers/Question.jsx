/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

function Question({ question }) {
  return (
    <li>
      <div>
        {'Q: '}
        <span>{question.question_body}</span>
        <span>
          {' Helpful? '}
          <a href="/">Yes</a>
          {' ('}
          <span>{question.question_helpfulness}</span>
          {') | '}
          <a href="/">Add Answer</a>
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
