import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { colors } from '../../../shared/principles';
import AwesomeIcon from '../AwesomeIcon';

const Wrapper = styled('button')`
  align-items: center;
  cursor: pointer;
  display: flex;
  outline: none;
  margin: 0;
  padding: 0;  
`;

const Content = styled('span')`
  border-bottom: ${props =>
    props.iconType ? 'none' : `1px solid ${colors.black}`};
  margin-left: ${props => (props.iconType ? '10px' : '0')};
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
