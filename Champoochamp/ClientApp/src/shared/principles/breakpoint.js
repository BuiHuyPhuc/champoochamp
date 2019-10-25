/** @jsx jsx */
import { css } from '@emotion/core';

const sizes = {
  sm: 575,
  md: 767,
  lg: 991,
  xl: 1200
};

const breakpoint = Object.keys(sizes).reduce((acc, size) => {
  acc[size] = (...args) => css`
    @media (max-width: ${sizes[size]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default breakpoint;
