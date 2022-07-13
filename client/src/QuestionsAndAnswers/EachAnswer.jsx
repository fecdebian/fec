import React from 'react';
import PropTypes from 'prop-types';
import FormattedDate from '../SharedComponents/FormattedDate';

function EachAnswer({ answer }) {
  return (
    <li>
      <div>
        {`A: ${answer.body}`}
      </div>
      <div>
        {'by '}
        <span>{answer.answerer_name === 'Seller' ? <strong>{answer.answerer_name}</strong> : answer.answerer_name}</span>
        {', '}
        <FormattedDate dateStr={answer.date} />
        {' | Helpful? '}
        <a href="/">Yes</a>
        <span>{` (${answer.helpfulness}) | `}</span>
        <a href="/">Report</a>
      </div>
    </li>
  );
}

EachAnswer.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    date: PropTypes.string,
    answerer_name: PropTypes.string,
    helpfulness: PropTypes.number,
  }).isRequired,
};

export default EachAnswer;
