import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { colors, typography } from '../../../shared/principles';

const Label = styled('label')`
  ${typography.lightText};
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
`;

const SingleInput = styled(Input)`
  border: solid 1px ${colors.gray};
  border-radius: 0;
  color: ${colors.black};
  font-size: inherit;
  height: auto;
  padding: 10px;
  width: ${props => props.width || 'auto'};

  &:active,
  &:focus,
  &:hover {
    border: solid 1px ${colors.black};
    box-shadow: none;
  }
`;

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }

  handleInputChange = e => {
    const text = e.target.value;

    this.setState({ text });
  };

  handleInputBlur = e => {
    const text = e.target.value;

    this.setState(
    {
      text
    },
      () => this.props.callback && this.props.callback(this.state.text)
    );
  };

  handleInputKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleInputBlur(e);
    }
  };

  render() {
    const { text } = this.state;
    const { id, label, isRequired } = this.props;

    return (
      <Fragment>
        {label && (
          <Label for={id}>
            {label}
            {isRequired && ' *'}
          </Label>
        )}
        <SingleInput
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
          value={text}
        />
      </Fragment>
    );
  }
}

TextInput.propsTypes = {
  id: PropTypes.string,
  callback: PropTypes.func,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  width: PropTypes.string
};

TextInput.defaulProps = {
  type: 'text'
};

export default TextInput;
