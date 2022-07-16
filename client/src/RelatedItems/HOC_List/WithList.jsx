/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useState } from 'react';

import ProductCard from '../HOC_ProductCard/ProductCard';

export default function withList() {
  const scrollRef = useRef(null);
  const [rightButtonOpacity, setRightButtonOpacity] = useState({});
  const [leftButtonOpacity, setLeftButtonOpacity] = useState({});

  const scrollRightHandler = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += 200;
    const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    if (maxScrollLeft === scrollRef.current.scrollLeft) {
      setRightButtonOpacity({ opacity: '0' });
    } else {
      setLeftButtonOpacity({});
    }
  };

  const scrollLeftHandler = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft -= 200;
    if (scrollRef.current.scrollLeft === 0) {
      setLeftButtonOpacity({ opacity: '0' });
    } else {
      setRightButtonOpacity({});
    }
  };

  return (
    <div>
      <div
        className="ListContainer"
        css={css`
          border-sizing: border-box;
          display:flex;
          justify-content:center;
          width:100;
          `}
      >
        <button
          className="scrollLeftButton"
          type="button"
          onClick={scrollLeftHandler}
          style={leftButtonOpacity}
          css={css`
          border-sizing: border-box;
          width:5%;
          z-index:10;
          display:flex;
          justify-content:center;
          align-items:center;
          color:black;
          background-color:transparent;
          border:none;
          font-size:5rem;`}
        >
          &#8249;
        </button>
        <div
          ref={scrollRef}
          className="related-Products-slider"
          css={css`
          border-sizing: border-box;
          display:flex;
          width:90%;
          overflow-x:scroll;
        `}
        >
          something
        </div>
        {/* right handler */}
        <button
          className="scrollRightButton"
          type="button"
          onClick={scrollRightHandler}
          style={rightButtonOpacity}
          css={css`
            border-sizing: border-box;
            width:5%;
            z-index:10;
            display:flex;
            justify-content:center;
            align-items:center;
            color:black;
            background-color:transparent;
            border:none;
            font-size:5rem;`}
        >
          &#8250;
        </button>
      </div>
      {/* <Modal show={show} /> */}
    </div>
  );
}
