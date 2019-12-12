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

const ProductName = styled('a')`
  ${typography.boldText};
  color: ${colors.black};
  display: block;

  &:hover {
    color: ${colors.black};
    text-decoration: underline;
  }
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
  constructor(props) {
    super(props);
    this.state = {
      transportFee: props.transportFee
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transportFee !== prevState.transportFee) {
      return {
        transportFee: nextProps.transportFee
      };
    }

    return null;
  }

  renderCartItem = shoppingCartList =>
    shoppingCartList.map(item => {
      const { id, product } = item.productVariant;

      return (
        <TextRow key={id}>
          <NavLink to={`/chi-tiet/${product.metaTitle}-${product.id}`}>
            <ProductName>{item.quantity} x {product.name}</ProductName>
          </NavLink>
          <RightText>{formatMoney(product.promotionPrice * item.quantity, true)}đ</RightText>
        </TextRow>
      );
    });

  render() {
    const { transportFee } = this.state;
    const { shoppingCartList, discount } = this.props;
    const discountAmount = discount ? discount.rate : 0;
    const tempMoney = formatMoney(getTotalMoney(shoppingCartList), false);
    const discountMoney = formatMoney(tempMoney * discountAmount / 100, false);
    const totalMoney = tempMoney - discountMoney - transportFee;

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
          <RightText>{formatMoney(transportFee, true)}đ</RightText>
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
