/* eslint-disable max-len */
/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Answers from './Answers';
import AddAnswer from './AddAnswer';

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
    <li css={css`
    padding: 4px;
    `}
    >
      <div css={css`
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      `}
      >
        <span css={css`
        font-size: 17px;
        `}
        >
          <strong>{`Q: ${question.question_body}`}</strong>
        </span>
        <span>
          {' Helpful? '}
          <button type="button" onClick={handleClick}>Yes</button>
          {' ('}
          <span>{clicked ? question.question_helpfulness + 1 : question.question_helpfulness}</span>
          {') '}
          &nbsp;
          {'| '}
          &nbsp;
          <AddAnswer key={question.question_id} question={question} />
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
