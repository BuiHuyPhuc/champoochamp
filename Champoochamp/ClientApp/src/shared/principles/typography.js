import { css } from '@emotion/core';
import breakpoint from './breakpoint';
import colors from './colors';

const titleFont = '"Roboto Slab", serif';

const weight = {
  bold: '700 !important',
  semiBold: '600 !important',
  normal: '400 !important'
};

const typography = {
  lgTitle: css`
    color: ${colors.black};
    font-family: ${titleFont};
    font-size: 36px;
    font-weight: ${weight.bold};
    line-height: 48px;

    ${breakpoint.md`
      font-size: 32px;
      line-height: 42px;
    `}
  `,

  mdTitle: css`
    color: ${colors.black};
    font-family: ${titleFont};
    font-size: 28px;
    font-weight: ${weight.bold};
    line-height: 38px;

    ${breakpoint.md`
      font-size: 24px;
      line-height: 32px;
    `}
  `,

  smTitle: css`
    color: ${colors.black};
    font-family: ${titleFont};
    font-size: 22px;
    font-weight: ${weight.bold};
    line-height: 32px;

    ${breakpoint.md`
      font-size: 18px;
      line-height: 26px;
    `}
  `,

  xsTitle: css`
    color: ${colors.black};
    font-family: ${titleFont};
    font-weight: ${weight.bold};
    line-height: 22px;
  `,

  boldText: css`
    color: ${colors.black};
    font-weight: ${weight.bold};
  `,

  semiBoldText: css`
    color: ${colors.black};
    font-weight: ${weight.semiBold};
  `,

  lightText: css`
    color: ${colors.darkGray};
    font-weight: ${weight.normal};
  `
};

export default typography;
