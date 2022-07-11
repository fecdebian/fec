import React from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList';

function QuestionsAndAnswers() {
  return (
    <div>
      <h3>Questions And Answers</h3>
      <input name='questionSearch' type='text' size='40' placeholder='Have a question? Search for answers...'/>
      <QuestionsList />
    </div>
  );
}

export default QuestionsAndAnswers;
