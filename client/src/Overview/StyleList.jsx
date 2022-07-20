/** @jsx jsx */
import { useRecoilValue } from 'recoil';
import { css, jsx } from '@emotion/react';

import StyleThumbnail from './StyleThumbnail';
import { currentProductStyles, selectedProductStyle } from './overviewAtoms';

function StyleList() {
  const currentStyle = useRecoilValue(selectedProductStyle);
  const productStyles = useRecoilValue(currentProductStyles);

  if (productStyles[0] === undefined) {
    return <div>Styles Loading...</div>;
  }

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
           align-items: end;
           overflow: auto;
           padding: 10px;
           margin: 10px;
           `}
      >
        {currentStyle.name}
        <br />
        <ul>
          {productStyles.map((style) => <StyleThumbnail key={style.style_id} styleThumb={style} />)}
        </ul>
      </div>
    </div>
  );
}

export default StyleList;
