import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import AwesomeIcon from '../AwesomeIcon';

const Wrapper = styled('button')`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  outline: none;
  margin: 0;
  padding: 0;
`;

const Content = styled('span')`
  font-size: inherit;
  margin-left: ${props => (props.iconType ? '10px' : '0')};
  text-decoration: ${props => (props.iconType ? 'none' : 'underline')};

  &:hover{
    text-decoration: underline;
  }
`;

class Link extends Component {
  render() {
    const { content, iconType, onClick } = this.props;

    return (
      <Wrapper onClick={onClick}>
        {iconType && <AwesomeIcon type={iconType} />}
        <Content iconType={iconType}>{content}</Content>
      </Wrapper>
    );
  }
}

Link.propsTypes = {
  content: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  onClick: PropTypes.func
};

export default Link;
