import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

import { colors } from '../../../shared/principles';

const Wrapper = styled('div')`
  align-items: center;
  border: solid 1px ${colors.gray};
  display: flex;
  justify-content: space-between;
  width: ${props => props.width || 'auto'};
`;

const ChangeQuantityButton = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 10px;
`;

const SingleInput = styled(Input)`
  border: none;
  border-radius: 0;
  color: ${colors.black};
  font-size: inherit;
  height: auto;
  padding: 10px;
  text-align: center;

  &:active,
  &:focus,
  &:hover {
    border: none;
    box-shadow: none;
  }
`;

class QuantityInput extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};

    this.state = {
      number: value.number || 1
    };
  }

  handleInputChange = e => {
    const number = e.target.value;

    this.setState({ number });
  };

  handleInputBlur = e => {
    const number = e.target.value;

    if (isNaN(number) || number <= 1) {
      this.setState({ number: 1 });
    } else {
      this.setState({
        number: Math.floor(number)
      });
    }
  };

  handleButtonClick = isIncrease => {
    const { number } = this.state;

    if (isIncrease) {
      this.setState({
        number: number + 1
      });
    } else {
      if (number <= 1) {
        return;
      }
      this.setState({
        number: number - 1
      });
    }
  };

  render() {
    const { number } = this.state;
    const { callback, width } = this.props;

    return (
      <Wrapper width={width}>
        <ChangeQuantityButton onClick={() => this.handleButtonClick(false)}>
          <Icon type="minus" />
        </ChangeQuantityButton>
        <SingleInput
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          value={number}
        />
        <ChangeQuantityButton onClick={() => this.handleButtonClick(true)}>
          <Icon type="plus" />
        </ChangeQuantityButton>
      </Wrapper>
    );
  }
}

QuantityInput.propTypes = {
  callback: PropTypes.func,
  width: PropTypes.string
};

export default QuantityInput;
