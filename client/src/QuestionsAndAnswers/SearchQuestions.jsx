import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sortedQuestionsState } from './atoms';

function SearchQuestions() {
  return (<input name="questionSearch" type="text" size="40" placeholder="Have a question? Search for answers..." />);
}

export default SearchQuestions;