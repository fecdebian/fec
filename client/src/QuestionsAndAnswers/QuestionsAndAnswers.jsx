import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList';

function QuestionsAndAnswers() {

  return (
    <div>
      Questions And Answers
      <input name='questionSearch' type='text' placeholder='Have a question? Search for answers...'/>
      <QuestionsList />
    </div>
  );
}

export default QuestionsAndAnswers;
