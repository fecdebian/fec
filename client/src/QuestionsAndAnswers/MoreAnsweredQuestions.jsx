import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { moreQuestionsState, questionsViewState, sortedQuestionsState } from './atoms';

function MoreAnsweredQuestions() {
  const [moreQuestions, setMoreQuestions] = useRecoilState(moreQuestionsState);
  const setQuestionsView = useSetRecoilState(questionsViewState);
  const sortedQuestions = useRecoilValue(sortedQuestionsState);

  function handleClick(e) {
    e.preventDefault();
    setMoreQuestions(moreQuestions - 2);
  }

  useEffect(() => { // when moreQuestions is updated, set a new questionsView
    if (Array.isArray(sortedQuestions)) { // if sortedQuestions is defined
      const copySortedQuestions = [...sortedQuestions];
      // console.log(moreQuestions);
      if (moreQuestions <= 0) { // if there are no more unseen questions, show all
        setQuestionsView(copySortedQuestions);
      }
      if (moreQuestions > 0) { // if there's more questions, change questionsView to see 2 more
        setQuestionsView(copySortedQuestions.slice(0, -moreQuestions));
      }
    }
  }, [moreQuestions]);

  return ( // button only appears if there are remaining unseen questions
    moreQuestions > 0 ? <button onClick={handleClick} type="button">More Answered Questions</button> : null
  );
}

export default MoreAnsweredQuestions;
