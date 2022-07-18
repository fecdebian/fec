/* eslint-disable max-len */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  anyResultsState, sortedQuestionsState, questionsViewState, searchedLengthState, moreQuestionsState,
} from './atoms';

function SearchQuestions() {
  const sortedQuestions = useRecoilValue(sortedQuestionsState);
  const setAnyResults = useSetRecoilState(anyResultsState);
  const setQuestionsView = useSetRecoilState(questionsViewState);
  const setSearchedLength = useSetRecoilState(searchedLengthState);
  const setMoreQuestions = useSetRecoilState(moreQuestionsState);

  function handleChange(e) {
    e.preventDefault();
    const searched = e.target.value;
    setSearchedLength(searched.length);

    if (searched.length >= 3) {
      const arr = [];

      sortedQuestions.forEach((question) => {
        const slicedQuestion = question.question_body.slice(0, searched.length);
        if (slicedQuestion === searched) {
          arr.push(question);
        }
      });

      if (arr.length === 0) {
        const sortedCopy = [...sortedQuestions];
        const sliced = sortedCopy.slice(0, 2);
        setMoreQuestions((sortedCopy.length - 2));
        setQuestionsView(sliced);
        setAnyResults(false);
      } else {
        setQuestionsView(arr);
        setAnyResults(true);
      }
    } else {
      const sortedCopy = [...sortedQuestions];
      const sliced = sortedCopy.slice(0, 2);
      setQuestionsView(sliced);
      setAnyResults(true);
    }
  }

  return (
    <input
      onChange={handleChange}
      name="questionSearch"
      type="text"
      placeholder="Have a question? Search for answers... (case-sensitive)"
      css={css`
      display: block;
      margin: 0 auto;
      width: 95%;
      padding: 7px;
      font-size: 17px;
      `}
    />
  );
}

export default SearchQuestions;
