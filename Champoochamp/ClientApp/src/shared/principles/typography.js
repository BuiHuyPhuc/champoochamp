import { css } from '@emotion/core';
import breakpoint from './breakpoint';
import color from './colors';

const family = {
  opensans: '"Open Sans", sans-serif'
};

const weight = {
  bold: '700 !important',
  medium: '400 !important',
  light: '300 !important'
};

const typography = {
  lgTitle: css`
    font-family: ${family.opensans};
    font-size: 40px;
    font-weight: ${weight.bold};
    line-height: 54px;

    ${breakpoint.md`
      font-size: 32px;
      line-height: 42px;
    `}
  `,

  mdTitle: css`
    font-family: ${family.opensans};
    font-size: 30px;
    font-weight: ${weight.bold};
    line-height: 40px;

    ${breakpoint.md`
      font-size: 26px;
      line-height: 34px;
    `}
  `,

  smTitle: css`
    font-family: ${family.opensans};
    font-size: 24px;
    font-weight: ${weight.bold};
    line-height: 34px;

    ${breakpoint.md`
      font-size: 20px;
      line-height: 28px;
    `}
  `,

  xsTitle: css`
    font-family: ${family.opensans};
    font-size: 14px;
    font-weight: ${weight.bold};
    line-height: 20px;
  `,

  normalBody: css`
    font-family: ${family.opensans};
    font-size: 14px;
    font-weight: ${weight.medium};
    line-height: 22px;
  `,

  lightBody: css`
    color: ${color.darkGray};
    font-family: ${family.opensans};
    font-size: 14px;
    font-weight: ${weight.light};
    line-height: 22px;
  `
};

export default typography;
