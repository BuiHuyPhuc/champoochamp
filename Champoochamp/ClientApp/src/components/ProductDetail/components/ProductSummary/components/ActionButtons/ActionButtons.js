import React, { Component } from 'react';
import styled from '@emotion/styled';

import { colors } from '../../../../../../shared/principles';
import { Link } from '../../../../../elements';

const Wrapper = styled('div')`
  align-items: center;
  display: flex;
  height: 50px;
  margin-top: 20px;
`;

const ButtonWrapper = styled('div')`
  border-right: 1px solid ${colors.gray};
  display: flex;
  justify-content: center;
  width: 100%;

  &:last-child {
    border-right: none;
  }
`;

class ActionButtons extends Component {
  render() {
    return (
      <Wrapper>
        <ButtonWrapper>
          <Link content="Chia sẻ" iconType="far fa-share-square" />
        </ButtonWrapper>
        <ButtonWrapper>
          <Link content="Yêu thích" iconType="far fa-heart" />
        </ButtonWrapper>
        <ButtonWrapper>
          <Link content="Hỗ trợ" iconType="far fa-comment-alt" />
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default ActionButtons;
