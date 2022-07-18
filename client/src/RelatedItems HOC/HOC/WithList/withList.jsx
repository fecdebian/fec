/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef, useState } from 'react';

// import Modal from './Modal/Modal';

export default function withList(WrappedComponent) {
  function WithList() {
    const scrollRef = useRef(null);
    // const [rightButtonOpacity, setRightButtonOpacity] = useState({});
    // const [leftButtonOpacity, setLeftButtonOpacity] = useState({});
    let rightButtonOpacity = {};
    let leftButtonOpacity = {};

    const scrollRightHandler = (e) => {
      e.preventDefault();
      scrollRef.current.scrollLeft += 200;
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const leftButtonElement = document.getElementsByClassName('scrollLeftButton');
      if (maxScrollLeft === scrollRef.current.scrollLeft) {
        e.target.setAttribute('style', 'opacity: 0');
      } else {
        leftButtonOpacity = ({});
        leftButtonElement[0].setAttribute('style', 'opacity: 100');
      }
    };

    const scrollLeftHandler = (e) => {
      e.preventDefault();
      scrollRef.current.scrollLeft -= 200;
      const rightButtonElement = document.getElementsByClassName('scrollRightButton');
      if (scrollRef.current.scrollLeft === 0) {
        leftButtonOpacity = ({ opacity: '0' });
        e.target.setAttribute('style', 'opacity: 0');
      } else {
        rightButtonElement[0].setAttribute('style', 'opacity: 100');
      }
    };

    console.log('withList render');

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
              font-size:5rem;
            `}
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
                font-size:5rem;
              `}
          >
            &#8250;
          </button>
        </div>
      </div>
    );
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
  WithList.displayName = `withList(${wrappedComponentName})`;

  return WithList;
}
