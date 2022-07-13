/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { answersDataState, answersState, questionIDState } from './atoms';
import Answer from './Answer';

function Question({ question }) {
  const [answersData, setAnswersData] = useRecoilState(answersDataState);
  const [answers, setAnswers] = useRecoilState(answersState);
  const [questionID, setQuestionID] = useRecoilState(questionIDState);

  useEffect(() => {
    setQuestionID(question.question_id);
  }, [question]);

  useEffect(() => {
    console.log(answersData);
    if (!answersData[questionID]) {
      axios({
        method: 'get',
        url: `/qa/questions/${questionID}/answers`,
        params: { count: 50 },
      }).then((res) => {
        const copyAnswersData = { ...answersData };
        copyAnswersData[questionID] = res.data.results;
        setAnswersData(copyAnswersData);
      }).catch((err) => {
        console.log('error getting answers for question: ', err);
      });
    }
  }, [questionID]);

  useEffect(() => {
    setAnswers(answersData[questionID]);
  }, [answersData]);

  if (questionID === 0) {
    return (<h3>Loading</h3>);
  }

  return (
    <li>
      <div>
        Q:
        {' '}
        {question.question_body}
        {' Helpful? '}
        <a href="/">Yes</a>
        {' ('}
        {question.question_helpfulness}
        {') | '}
        <a href="/">Add Answer</a>
      </div>
      <ul>
        {answers ? answers.map((answer) => <Answer key={answer.answer_id} answer={answer} />) : null}
      </ul>
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
  }).isRequired,
};
export default Question;
