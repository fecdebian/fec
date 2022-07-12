import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { answersState } from './atoms';

function Answer({ question }) {
  const [answers, setAnswers] = useRecoilState(answersState);
  useEffect(() => {
    axios({
      method: 'get',
      url: `/qa/questions/${question.question_id}/answers`,
      params: { count: 50 },
    }).then((res) => {
      console.log(res.data.results);
    }).catch((err) => {
      console.log('error getting answers for question: ', err);
    });
  }, []);
  return (
    <div>
      A:
      {' '}
      {question.question_id}
    </div>
  );
}

Answer.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.string,
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    question_helpfulness: PropTypes.number,
    reported: PropTypes.bool,
  }).isRequired,
};

export default Answer;
