import React, { Component } from 'react';
import listensToClickOutside from 'react-onclickoutside';
import { Icon } from 'antd';
import styled from '@emotion/styled';

import { colors } from '../../../../../../shared/principles';

const Wrapper = styled('div')`
  cursor: pointer;
  position: relative;
`;

const CartQuantity = styled('span')`
  background: ${colors.black};
  border-radius: 50%;
  color: ${colors.white};
  height: 17px;
  font-size: 10px;
  line-height: 17px;
  position: absolute;
  text-align: center;
  top: -8px;
  left: 10px;
  width: 17px;
`;

const CartSummary = styled('div')`
  background: ${colors.white};
  border: solid 1px ${colors.gray};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  max-height: 80vh;
  overflow-y: auto;
  padding: 10px;
  position: absolute;
  right: -15px;
  top: 150%;
  width: 400px;
  z-index: 100;
`;

class ShoppingCartHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onShowCartSummary = () => {
    this.setState({
      isVisible: true
    });
  };

  onHideCartSummary = () => {
    this.setState({
      isVisible: false
    });
  };

  handleClickOutside = () => {
    this.onHideCartSummary();
  };

  render() {
    const { shoppingCartCount } = this.props;
    const { isVisible } = this.state;

    return (
      <Wrapper onClick={this.onShowCartSummary}>
        <Icon type="shopping" />
        <CartQuantity>{shoppingCartCount}</CartQuantity>
        {isVisible && <CartSummary>Hello</CartSummary>}
      </Wrapper>
    );
  }
}

export default listensToClickOutside(ShoppingCartHeader);
