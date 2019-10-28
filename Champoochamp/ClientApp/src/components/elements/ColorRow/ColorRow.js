import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ColorChoice from './components/ColorChoice';

const Wrapper = styled('div')`
  display: flex;
`;

class ColorRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: props.colors[0]
    };

    props.getImageUrls(this.state.selectedColor);
    props.getColorId(this.state.selectedColor.color.id)
  }

  callback = selectedColor => {
    this.setState({ selectedColor });
    this.props.getImageUrls(selectedColor);
    this.props.getColorId(selectedColor.color.id);
  }

  render() {
    const { selectedColor } = this.state;
    const { colors, size } = this.props;

    return (
      <Wrapper>
        {colors.map(item => {
          if (item.color.id === selectedColor.color.id) {
            return (<ColorChoice key={item.color.id} color={item} size={size} isSelected callback={this.callback} />);
          }
          else {
            return (<ColorChoice key={item.color.id} color={item} size={size} callback={this.callback} />);
          }
        })}
      </Wrapper>
    );
  }
}

ColorRow.propsTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.number
};

export default ColorRow;
