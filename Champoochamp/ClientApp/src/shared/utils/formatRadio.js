/** @jsx jsx */
import { css } from '@emotion/core';
import { colors } from '../principles';

const formatRadio = css`
  .ant-radio-group {
    width: 100%;
  }

  .ant-radio-wrapper {
    color: ${colors.black};
    display: block;
    margin-bottom: 15px;
  }

  span.ant-radio + * {
    white-space: normal;
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: ${colors.black};
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: ${colors.black};

    &:after {
      background-color: ${colors.black};
    }
  }

  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${colors.black};
    box-shadow: none;
  }
`;

export default formatRadio;
