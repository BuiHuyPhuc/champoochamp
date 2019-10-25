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
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  onClick = () => {
    this.setState({
      isSelected: !this.state.isSelected
    });
  };

  render() {
    const { color, size } = this.props;
    const { isSelected } = this.state;

    return (
      <Wrapper isSelected={isSelected} onClick={this.onClick} size={size}>
        <SingleColor color={color} size={size} />
      </Wrapper>
    );
  }
}

ColorChoice.propsTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export default ColorChoice;
