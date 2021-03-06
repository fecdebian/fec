/* eslint-disable max-len */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { questionsViewState, searchedLengthState } from './atoms';
import Question from './Question';
import MoreAnsweredQuestions from './MoreAnsweredQuestions';

function QuestionsList() {
  const questionsView = useRecoilValue(questionsViewState);
  const searchedLength = useRecoilValue(searchedLengthState);

  if (questionsView.length === 0) {
    return <div>No Questions Found...</div>;
  }

  // returns mapped list of all viewed questions, + more answered questions button
  return (
    <span>
      <ul css={css`
        max-height: 270px;
        overflow: auto;
        padding: 8px;
        margin: 10px;
        border: solid black 2px;
      `}
      >
        {questionsView.map((question) => <Question key={question.question_id} question={question} />)}
      </ul>
      {searchedLength < 3 ? <MoreAnsweredQuestions /> : null}
    </span>
  );
}
export default QuestionsList;
