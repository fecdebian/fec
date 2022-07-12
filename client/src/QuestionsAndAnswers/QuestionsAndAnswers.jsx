import React from 'react';
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
