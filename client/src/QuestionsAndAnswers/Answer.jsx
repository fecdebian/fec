import React from 'react';
import PropTypes from 'prop-types';

function Answer({ answer }) {
  return (
    <li>
      <div>
        ID:
        {' '}
        {answer.answer_id}
      </div>
      <div>
        A:
        {' '}
        {answer.body}
      </div>
    </li>
  );
}

Answer.propTypes = {
  answer: PropTypes.shape({
    answer_id: PropTypes.number,
    body: PropTypes.string,
    date: PropTypes.string,
    answerer_name: PropTypes.string,
    helpfulness: PropTypes.number,
  }).isRequired,
};

export default Answer;
