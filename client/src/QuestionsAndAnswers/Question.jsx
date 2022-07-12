import React from 'react';
import PropTypes from 'prop-types';

function Question({ question }) {
  return (
    <li>
      <div>
        Q:
        {' '}
        {question.question_body}
        {' '}
        <a href="/">Helpful?</a>
        {' '}
        Yes
        {' '}
        {question.question_helpfulness}
        {' | '}
        <a href="/">Add Answer</a>
      </div>
    </li>
  );
}
Question.propTypes = {
  question: PropTypes.shape({
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    question_helpfulness: PropTypes.number,
    reported: PropTypes.bool,
  }).isRequired,
};
export default Question;
