/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { displayModeState } from './QuestionsAndAnswers/atoms';

function ToggleButton() {
  const [displayMode, setDisplayMode] = useRecoilState(displayModeState);
  function handleClick(e) {
    e.preventDefault();
    setDisplayMode(!displayMode);
  }
  return (
    <span css={css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 5px;
    font-size: 30px;
    `}
    >
      <div>DEBIAN</div>
      <button type="button" onClick={handleClick}>Light/Dark</button>
    </span>
  );
}

export default ToggleButton;
