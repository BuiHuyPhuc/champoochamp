import React, { Component } from 'react';
import { Icon } from 'antd';
import styled from '@emotion/styled';

import { getCartTotalQuantity } from '../../../../../../shared/utils';
import { colors } from '../../../../../../shared/principles';

const Wrapper = styled('div')`
  position: relative;
`;

const CartIcon = styled('div')`
  cursor: pointer;
`;

const Quantity = styled('span')`
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

class ShoppingCartHeader extends Component {
  render() {
    const { strShoppingCart, onShowDrawer } = this.props;

    return (
      <Wrapper onClick={onShowDrawer}>
        <CartIcon title="Giỏ hàng">
          <Icon type="shopping" />
          <Quantity>{strShoppingCart ? getCartTotalQuantity(strShoppingCart) : 0}</Quantity>
        </CartIcon>
      </Wrapper>
    );
  }
}

export default ShoppingCartHeader;
