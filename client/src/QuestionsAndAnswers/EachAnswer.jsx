import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormattedDate from '../SharedComponents/FormattedDate';

function EachAnswer({ answer }) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  function handleHelpfulClick(e) {
    e.preventDefault();
    if (!helpfulClicked) {
      setHelpfulClicked(true);
      axios.put(`/qa/answers/${answer.id}/helpful`)
        .catch((err) => {
          console.error(err);
        });
    }
  }
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
        <button onClick={handleHelpfulClick} type="button">Yes</button>
        {' ( '}
        <span>{helpfulClicked ? answer.helpfulness + 1 : answer.helpfulness}</span>
        {') | '}
        <button type="button">Report</button>
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
