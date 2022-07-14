/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EachAnswer from './EachAnswer';

function Answers({ question }) {
  let sellerAnswers;
  let otherAnswers;

  function quickSort(origArray) { // sorting answers by most to least helpful
    if (origArray.length <= 1) {
      return origArray;
    }

    const left = [];
    const right = [];
    const newArray = [];
    const pivot = origArray.pop();
    const { length } = origArray;

    for (let i = 0; i < length; i += 1) {
      if (origArray[i].helpfulness <= pivot.helpfulness) {
        right.push(origArray[i]);
      } else {
        left.push(origArray[i]);
      }
    }

    return newArray.concat(quickSort(left), pivot, quickSort(right));
  }

  function getSellerAnswers(splitAnswers) { // Seller answers have to come first, so split the array into seller answers and other
    sellerAnswers = [];
    otherAnswers = [];
    splitAnswers.forEach((answer) => {
      if (answer.answerer_name === 'Seller') {
        sellerAnswers.push(answer);
      } else {
        otherAnswers.push(answer);
      }
    });
  }

  let answerList = Object.values(question.answers); // get list of answers from question prop
  getSellerAnswers(answerList); // split answers (seller or not seller)
  sellerAnswers = quickSort(sellerAnswers);
  otherAnswers = quickSort(otherAnswers); // sort seller and other answers independently by helpfulness
  answerList = sellerAnswers.concat(otherAnswers); // add sorted other answers following seller answers
  const firstTwo = answerList.slice(0, 2);
  const [selectedView, setSelectedView] = useState(firstTwo); // by default will only show first two answers
  const [showAll, setShowAll] = useState(false);

  function handleClick(e) { // changes view from 2 to all answers when See More Answers is clicked
    e.preventDefault();
    if (!showAll) {
      setShowAll(true);
      setSelectedView(answerList);
    } else {
      setShowAll(false);
      setSelectedView(firstTwo);
    }
  }

  if (selectedView.length === 0) {
    return (null);
  }

  return (
    <span>
      <ul key={question.question_id}>{selectedView.map((answer) => <EachAnswer key={answer.id} answer={answer} />)}</ul>
      {answerList.length > 2 ? <button onClick={handleClick} type="button">{showAll ? 'Collapse Answers' : 'See More Answers'}</button> : null}
    </span>
  );
}

Answers.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number,
    body: PropTypes.string,
    answers: PropTypes.shape({}),
  }).isRequired,
};

export default Answers;
