/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useState } from 'react';

// import Modal from './Modal/Modal';

export default function withList(WrappedComponent) {
  function WithList() {
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
        <h2>More in related products</h2>
        <div
          css={css`
            border-sizing: border-box;
            display:flex;
            justify-content:center;
            width:100;
            `}
        >
          <button
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
            id="related-Products-slider"
            css={css`
            border-sizing: border-box;
            display:flex;
            width:90%;
            overflow-x:scroll;
          `}
          >
            <WrappedComponent />
          </div>
          {/* right handler */}
          <button
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

  const wrappedComponentName = WrappedComponent.displayName
  || WrappedComponent.name
  || 'Component';
  WithList.displayName = `withList(${wrappedComponentName})`;

  return WithList;
}
