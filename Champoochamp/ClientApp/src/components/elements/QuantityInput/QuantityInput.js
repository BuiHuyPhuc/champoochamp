import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

import {
  minProductQuantity,
  maxProductQuantity
} from '../../../shared/constants';
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
  color: ${colors.darkGray};
  cursor: pointer;
  outline: none;
  padding: 10px;

  &:hover{
    color: ${colors.black};
  }
`;

const SingleInput = styled(Input)`
  border: none;
  border-radius: 0;
  color: ${colors.black};
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

    this.state = {
      number: props.value
    };
  }

  handleInputChange = e => {
    const number = e.target.value;

    this.setState({ number });
  };

  handleInputBlur = e => {
    const number = e.target.value;

    if (isNaN(number) || number < minProductQuantity) {
      this.setState({ number: minProductQuantity });
    } else if (number > maxProductQuantity) {
      this.setState({ number: maxProductQuantity });
    } else {
      this.setState(
        {
          number: Math.floor(number)
        },
        () =>
          this.props.callback(this.props.productVariantId, this.state.number)
      );
    }
  };

  handleButtonClick = isIncrease => {
    const { number } = this.state;
    const { callback } = this.props;

    if (isIncrease) {
      if (number >= maxProductQuantity) {
        return;
      }
      this.setState(
        {
          number: number + 1
        },
        () => callback(this.props.productVariantId, this.state.number)
      );
    } else {
      if (number <= minProductQuantity) {
        return;
      }
      this.setState(
        {
          number: number - 1
        },
        () => callback(this.props.productVariantId, this.state.number)
      );
    }
  };

  render() {
    const { number } = this.state;
    const { width } = this.props;

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
  width: PropTypes.string,
  value: PropTypes.number,
  productVariantId: PropTypes.string
};

export default QuantityInput;
