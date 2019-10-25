import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ColorChoice from './components/ColorChoice';

const Wrapper = styled('div')`
  display: flex;
`;

class ColorRow extends Component {
  render() {
    const { colors, size } = this.props;

    return (
      <Wrapper>
        {colors.map(item => (
          <ColorChoice color={item.name} size={size} />
        ))}
      </Wrapper>
    );
  }
}

ColorRow.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.number
};

export default ColorRow;
