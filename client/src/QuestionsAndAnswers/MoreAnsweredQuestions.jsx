/** @jsx jsx */
import { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { moreQuestionsState, questionsViewState, sortedQuestionsState } from './atoms';

function MoreAnsweredQuestions() {
  const [moreQuestions, setMoreQuestions] = useRecoilState(moreQuestionsState);
  const setQuestionsView = useSetRecoilState(questionsViewState);
  const sortedQuestions = useRecoilValue(sortedQuestionsState);

  function handleClick(e) {
    e.preventDefault();
    console.log(moreQuestions);
    setMoreQuestions(moreQuestions - 2);
  }

  // when moreQuestions is updated, set a new questionsView
  useEffect(() => {
    // if sortedQuestions is defined
    if (Array.isArray(sortedQuestions)) {
      const copySortedQuestions = [...sortedQuestions];

      // if there are no more unseen questions, show all
      if (moreQuestions <= 0) {
        setQuestionsView(copySortedQuestions);
      }

      // if there's more questions, change questionsView to see 2 more
      if (moreQuestions > 0) {
        setQuestionsView(copySortedQuestions.slice(0, -moreQuestions));
      }
    }
  }, [moreQuestions]);

  // button only appears if there are remaining unseen questions
  return (
    moreQuestions > 0 ? (
      <span css={css`
        display: inline;
        margin: 5px;
      `}
      >
        <button onClick={handleClick} type="button">More Answered Questions</button>
      </span>
    ) : null
  );
}

export default MoreAnsweredQuestions;
