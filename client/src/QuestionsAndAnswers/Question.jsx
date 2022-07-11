import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Question({ question }) {
  return (
    <li>
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
