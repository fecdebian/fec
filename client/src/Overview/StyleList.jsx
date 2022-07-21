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
    <div>
      <div>
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
