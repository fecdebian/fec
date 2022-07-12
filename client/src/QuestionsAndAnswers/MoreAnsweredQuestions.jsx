import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { moreQuestionsState, questionsViewState, sortedQuestionsState } from './atoms';

function MoreAnsweredQuestions() {
  const [moreQuestions, setMoreQuestions] = useRecoilState(moreQuestionsState);
  const [questionsView, setQuestionsView] = useRecoilState(questionsViewState);
  const sortedQuestions = useRecoilValue(sortedQuestionsState);

  function handleClick(e) {
    e.preventDefault();
    setMoreQuestions(moreQuestions - 2);
  }

  useEffect(() => {
    if (Array.isArray(sortedQuestions)) {
      const copySortedQuestions = [...sortedQuestions];
      console.log(moreQuestions);
      if (moreQuestions === -1) {
        setQuestionsView(copySortedQuestions);
      }
      if (moreQuestions >= 0) {
        setQuestionsView(copySortedQuestions.slice(0, -moreQuestions));
      }
    }
  }, [moreQuestions]);

  return (
    moreQuestions > 0 ? <button onClick={handleClick} type="button">More Answered Questions</button> : null
  );
}

export default MoreAnsweredQuestions;
