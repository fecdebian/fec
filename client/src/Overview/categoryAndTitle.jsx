/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRecoilState } from 'recoil';

import currentProductState from '../currentProduct';

function CatAndTitle() {
  const currentProduct = useRecoilState(currentProductState);
  const proCat = currentProduct[0].category;
  const proTitle = currentProduct[0].name;

  return (
    <div css={css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    overflow: auto;
    padding: 10px;
    margin: 10px;
    `}
    >
      <div css={css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: auto;
    padding: 0px;
    margin: 0px;
    `}
      >
        <h3>{proCat}</h3>
        <h1>{proTitle}</h1>
      </div>
    </div>
  );
}

export default CatAndTitle;
