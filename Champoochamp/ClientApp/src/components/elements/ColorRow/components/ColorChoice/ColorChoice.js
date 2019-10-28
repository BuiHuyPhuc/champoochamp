import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { colors } from '../../../../../shared/principles';

const Wrapper = styled('div')`
  border: ${props => (props.isSelected ? `solid 1px ${colors.black}` : `solid 1px transparent`)};
  cursor: pointer;
  margin-right: ${props => props.size / 4}px;
  padding: 1px;
`;

const SingleColor = styled('div')`
  background: ${props => props.color};
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

class ColorChoice extends Component {
  onClick = (color, callback) => {
    callback(color);
  };

  render() {
    const { color, size, isSelected, callback } = this.props;

    return (
      <Wrapper isSelected={isSelected} onClick={() => this.onClick(color, callback)} size={size}>
        <SingleColor color={color.color.code} size={size} />
      </Wrapper>
    );
  }
}

ColorChoice.propsTypes = {
  color: PropTypes.object,
  size: PropTypes.number,
  isSelected: PropTypes.bool,
  callback: PropTypes.func
};

export default ColorChoice;
