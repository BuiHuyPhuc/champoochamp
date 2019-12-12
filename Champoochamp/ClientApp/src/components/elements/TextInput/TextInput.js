import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { colors } from '../../../shared/principles';

const SingleInput = styled(Input)`
  border: solid 1px ${colors.gray};
  border-radius: 0;
  color: ${colors.black};
  font-size: inherit;
  height: auto;
  padding: 10px;
  width: ${props => props.width || '100%'};

  &:active,
  &:focus,
  &:hover {
    border: solid 1px ${colors.black};
    box-shadow: none;
  }
`;

class TextInput extends Component {
  handleInputChange = e => {
    this.props.callback && this.props.callback(e.target.value);
  };

  handleInputKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleInputBlur(e);
    }
  };

  render() {
    const { placeholder, width } = this.props;

    return (
      <SingleInput
        onChange={this.handleInputChange}
        placeholder={placeholder}
        width={width}
      />
    );
  }
}

TextInput.propsTypes = {
  callback: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string
};

TextInput.defaulProps = {
  type: 'text'
};

export default TextInput;
