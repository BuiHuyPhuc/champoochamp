import { css } from '@emotion/core';
import breakpoint from './breakpoint';
import color from './colors';

const family = {
  openSans: '"Open Sans", sans-serif',
  robotoSlab: '"Roboto Slab", serif'
};

const weight = {
  bold: '700 !important',
  medium: '600 !important',
  normal: '400 !important'
};

const typography = {
  lgTitle: css`
    font-family: ${family.robotoSlab};
    font-size: 36px;
    font-weight: ${weight.bold};
    line-height: 48px;

    ${breakpoint.md`
      font-size: 32px;
      line-height: 42px;
    `}
  `,

  mdTitle: css`
    font-family: ${family.robotoSlab};
    font-size: 28px;
    font-weight: ${weight.bold};
    line-height: 38px;

    ${breakpoint.md`
      font-size: 24px;
      line-height: 32px;
    `}
  `,

  smTitle: css`
    font-family: ${family.robotoSlab};
    font-size: 22px;
    font-weight: ${weight.bold};
    line-height: 32px;

    ${breakpoint.md`
      font-size: 18px;
      line-height: 26px;
    `}
  `,

  xsTitle: css`
    font-family: ${family.robotoSlab};
    font-weight: ${weight.bold};
    line-height: 22px;
  `,

  body: css`
    font-family: ${family.openSans};
    font-weight: ${weight.normal};
    line-height: 22px;
  `,

  lightBody: css`
    color: ${color.darkGray};
    font-family: ${family.openSans};
    font-weight: ${weight.normal};
    line-height: 22px;
  `
};

export default typography;
