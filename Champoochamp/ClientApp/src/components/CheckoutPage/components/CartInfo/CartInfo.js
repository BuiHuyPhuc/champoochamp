import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';

import { typography, colors } from '../../../../shared/principles';
import { Link, Button } from '../../../elements';

const SmallTitle = styled('h4')`
  ${typography.smTitle};
`;

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
  margin-right: 10px;
`;

const RightText = styled('span')`
  text-align: right;
`;

const Total = styled('span')`
  ${typography.smTitle};
`;

class CartInfo extends Component {
  editCart = () => {
    // Go to Cart page here.
  };

  submitForm = () => {
    // Submit form here.
  };

  render() {
    return (
      <Fragment>
        <SmallTitle>Chi tiết đơn hàng</SmallTitle>
        <Link content="Chỉnh sửa" onClick={this.editCart} />

        <CartItemWrapper>
          <TextRow>
            <LeftText>1 x Vertical stripes tee</LeftText>
            <RightText>7.560.000đ</RightText>
          </TextRow>
          <TextRow>
            <LeftText>2 x Vertical stripes stripes tee</LeftText>
            <RightText>960.000đ</RightText>
          </TextRow>
          <TextRow>
            <LeftText>1 x Vertical stripes tee teetee</LeftText>
            <RightText>17.200.000đ</RightText>
          </TextRow>
        </CartItemWrapper>

        <TextRow>
          <LeftText>Tạm tính</LeftText>
          <RightText>17.200.000đ</RightText>
        </TextRow>
        <TextRow>
          <LeftText>Phí vận chuyển</LeftText>
          <RightText>30.000đ</RightText>
        </TextRow>
        <TextRow>
          <LeftText>Giảm giá</LeftText>
          <RightText>- 150.000đ</RightText>
        </TextRow>
        <TextRow>
          <LeftText>
            <Total>Tổng cộng</Total>
          </LeftText>
          <RightText>
            <Total>17.670.000đ</Total>
          </RightText>
        </TextRow>

        <Button
          title="Đặt hàng"
          htmlType="submit"
          isBlockButton
          onClick={this.submitForm}
        />
      </Fragment>
    );
  }
}

export default CartInfo;
