import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ColorChoice from './components/ColorChoice';

const Wrapper = styled('div')`
  display: flex;
`;

class ColorRow extends Component {
  render() {
    const { colors, size, selectedColor, getSelectedColor } = this.props;

    return (
      <Wrapper>
        {colors.map(item => {
          if (item.color.id === selectedColor.color.id) {
            return (<ColorChoice key={item.color.id} color={item} size={size} isSelected getSelectedColor={getSelectedColor} />);
          }
          else {
            return (<ColorChoice key={item.color.id} color={item} size={size} getSelectedColor={getSelectedColor} />);
          }
        })}
      </Wrapper>
    );
  }
}

ColorRow.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.number,
  selectedColor: PropTypes.object,
  getSelectedColor: PropTypes.func
};

export default ColorRow;
