/** @jsx jsx */
import { css } from '@emotion/core';
import { colors } from '../principles';

const formatCheckbox = css`
  .ant-checkbox-wrapper {
    color: ${colors.black};
  }

  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${colors.black};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${colors.black};
    border-color: ${colors.black};
  }
`;

export default formatCheckbox;
