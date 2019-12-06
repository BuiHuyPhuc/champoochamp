import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { typography, colors } from '../../../../shared/principles';
import { formatMoney, getTotalMoney } from '../../../../shared/utils';

import { Link, Button } from '../../../elements';

const CartItemWrapper = styled('div')`
  border-bottom: solid 1px ${colors.gray};
  margin: 30px 0 20px 0;
`;

const TextRow = styled('div')`
  color: ${colors.black};
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LeftText = styled('span')`
  ${typography.boldText};
  margin-right: 10px;
`;

const RightText = styled('span')`
  text-align: right;
`;

const Total = styled('span')`
  ${typography.smTitle};
`;

const FinishButton = styled(Button)`
  margin-top: 15px;
`;

class CartInfo extends Component {
  renderCartItem = shoppingCartList =>
    shoppingCartList.map(item => {
      const { id, product } = item.productVariant;

      return (
        <TextRow key={id}>
          <LeftText>{item.quantity} x {product.name}</LeftText>
          <RightText>{formatMoney(product.promotionPrice * item.quantity, true)}đ</RightText>
        </TextRow>
      );
    });

  render() {
    const { shoppingCartList, discount } = this.props;
    const discountAmount = discount ? discount.rate : 0;
    const tempMoney = formatMoney(getTotalMoney(shoppingCartList), false);
    const discountMoney = formatMoney(tempMoney * discountAmount / 100, false);
    const totalMoney = tempMoney - discountMoney;

    return (
      <Fragment>
        <NavLink to="/gio-hang">
          <Link content="Chỉnh sửa" />
        </NavLink>

        <CartItemWrapper>
          {this.renderCartItem(shoppingCartList)}
        </CartItemWrapper>

        <TextRow>
          <LeftText>Tạm tính</LeftText>
          <RightText>{formatMoney(tempMoney, true)}đ</RightText>
        </TextRow>
        <TextRow>
          <LeftText>Phí vận chuyển</LeftText>
          <RightText>30.000đ</RightText>
        </TextRow>
        {discountMoney > 0 &&
          <TextRow>
            <LeftText>Giảm giá</LeftText>
            <RightText>- {formatMoney(discountMoney, true)}đ</RightText>
          </TextRow>
        }
        <TextRow>
          <LeftText>
            <Total>Tổng cộng</Total>
          </LeftText>
          <RightText>
            <Total>{formatMoney(totalMoney, true)}đ</Total>
          </RightText>
        </TextRow>

        <FinishButton title="Đặt hàng" htmlType="submit" isBlockButton />
      </Fragment>
    );
  }
}

export default CartInfo;
