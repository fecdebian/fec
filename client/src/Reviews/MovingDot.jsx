/** @jsx jsx */
import { css, jsx, useState } from '@emotion/react';
// import { useState } from 'react';
import PropTypes from 'prop-types';

export default function MovingDot({ children }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      css={css`
        position: relative;
        // width: 100vw;
        // height: 100vh;
      `}
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      <div
        css={css`
          position: absolute;
          background-color: rgba(0, 255, 0, 0.3);
          border-radius: 50%;
          transform: translate(${position.x * 0.1}vw, ${position.y * 0.1}vh);
          left: -10;
          top: -10;
          width: 25px;
          height: 25px;
      `}
      />
      {children}
    </div>
  );
}
