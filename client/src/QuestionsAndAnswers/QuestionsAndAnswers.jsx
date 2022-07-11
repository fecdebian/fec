import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  questions as questionsAtom, productID as productIDAtom, page as pageAtom, count as countAtom,
} from './atoms';
import SearchQuestions from './SearchQuestions';
import QuestionsList from './QuestionsList';

function QuestionsAndAnswers() {
  return (
    <div>
      <h3>Questions And Answers</h3>
      <SearchQuestions />
      <QuestionsList />
    </div>
  );
}
export default QuestionsAndAnswers;
