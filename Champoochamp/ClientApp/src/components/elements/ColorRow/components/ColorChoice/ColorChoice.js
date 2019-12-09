import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { colors } from '../../../../../shared/principles';

const Wrapper = styled('div')`
  border: solid 1px
    ${props => (props.isSelected ? colors.black : colors.lightGray)};
  cursor: pointer;
  margin-right: ${props => props.size / 5}px;
  padding: 1px;
`;

const SingleColor = styled('div')`
  background: ${props => props.color};
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

class ColorChoice extends Component {
  onClick = (color, getSelectedColor) => {
    getSelectedColor(color);
  };

  render() {
    const { color, size, isSelected, getSelectedColor } = this.props;

    return (
      <Wrapper
        isSelected={isSelected}
        onClick={() => this.onClick(color, getSelectedColor)}
        size={size}
      >
        <SingleColor color={color.color.code} size={size} />
      </Wrapper>
    );
  }
}

ColorChoice.propsTypes = {
  color: PropTypes.object,
  size: PropTypes.number,
  isSelected: PropTypes.bool,
  getSelectedColor: PropTypes.func
};

export default ColorChoice;
