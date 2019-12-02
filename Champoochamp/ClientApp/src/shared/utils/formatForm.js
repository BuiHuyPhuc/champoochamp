/** @jsx jsx */
import { css } from '@emotion/core';
import { colors } from '../principles';

const formatForm = css`
  .ant-form-item {
    margin-bottom: 15px;
  }

  .ant-input {
    border-color: ${colors.gray};
    border-radius: 0;
    color: ${colors.black};
    height: 40px;
    transition: all 0.2s;

    &:active,
    &:focus,
    &:hover {
      border-color: ${colors.black};
      box-shadow: none;
    }
  }

  .ant-form-explain {
    color: ${colors.black};
    margin-top: 5px;
  }

  .has-error .ant-input:not([disabled]):hover {
    border-color: ${colors.black};
  }
`;

export default formatForm;
