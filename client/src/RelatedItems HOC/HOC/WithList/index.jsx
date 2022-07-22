/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default function withList(WrappedComponent) {
  function WithList({ currentProductDetail }) {
    const scrollRef = useRef(null);

    const scrollRightHandler = (e) => {
      e.preventDefault();
      scrollRef.current.scrollLeft += 183;
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const leftButtonElement = document.getElementsByClassName('scrollLeftButton');
      if (maxScrollLeft === scrollRef.current.scrollLeft) {
        e.target.setAttribute('style', 'opacity: 0');
      } else {
        const leftButtonStyle = leftButtonElement[0].getAttribute('style');
        if (leftButtonStyle !== 'opacity: 100') {
          leftButtonElement[0].setAttribute('style', 'opacity: 100');
        }
      }
    };

    const scrollLeftHandler = (e) => {
      e.preventDefault();
      scrollRef.current.scrollLeft -= 183;
      const rightButtonElement = document.getElementsByClassName('scrollRightButton');
      if (scrollRef.current.scrollLeft === 0) {
        e.target.setAttribute('style', 'opacity: 0');
      } else {
        const rightButtonStyle = rightButtonElement[0].getAttribute('style');
        if (rightButtonStyle !== 'opacity: 100') {
          rightButtonElement[0].setAttribute('style', 'opacity: 100');
        }
      }
    };

    return (
      <div>
        <StyledSliderContainer>
          <StyledScrollButton
            className="scrollLeftButton"
            type="button"
            onClick={scrollLeftHandler}
          >
            &#8249;
          </StyledScrollButton>
          <StyledProductsslider
            ref={scrollRef}
            id="related-Products-slider"
          >
            <WrappedComponent currentProductDetail={currentProductDetail} />
          </StyledProductsslider>
          <StyledScrollButton
            className="scrollRightButton"
            type="button"
            onClick={scrollRightHandler}
          >
            &#8250;
          </StyledScrollButton>
        </StyledSliderContainer>
      </div>
    );
  }

  WithList.propTypes = {
    currentProductDetail: PropTypes.shape({
    }).isRequired,
  };

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
  WithList.displayName = `withList(${wrappedComponentName})`;

  return WithList;
}

/* ===========    CSS Styled Components   =========== */
const StyledSliderContainer = styled.div`
  border-sizing: border-box;
  display:flex;
  justify-content:center;
  width:100;
`;

const StyledScrollButton = styled.button`
  border-sizing: border-box;
  width:5%;
  z-index:10;
  display:flex;
  justify-content:center;
  align-items:center;
  color:black;
  background-color:transparent;
  border:none;
  font-size:6rem;
`;

const StyledProductsslider = styled.div`
  border-sizing: border-box;
  display:flex;
  width:90%;
  overflow-x:scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
