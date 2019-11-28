import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../shared/principles';
import { TextInput, Button, Link } from '../../../elements';

const Wrapper = styled('div')`
  padding: 25px 0;
`;

const ContentRow = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const InfoText = styled('span')`
  ${props => (props.isTotal ? typography.smTitle : typography.semiBoldText)};
  font-size: ${props => !props.isTotal && '16px'};
  text-align: right;
`;

class CartInfo extends Component {
  applyDiscountCode = () => {
    // apply discount code here.
  };

  checkout = () => {
    // checkout here.
  };

  continueShopping = () => {
    // return to continue shopping here.
  };

  render() {
    return (
      <Wrapper>
        <ContentRow>
          <InfoText>Tạm tính: 5.290.000đ</InfoText>
        </ContentRow>
        <ContentRow>
          <InfoText>Giảm giá: -1.650.000đ</InfoText>
        </ContentRow>
        <ContentRow>
          <TextInput
            id="name"
            placeholder="Nhập mã giảm giá"
            width="200px"
            onBlur={this.callback}
          />
        </ContentRow>
        <ContentRow>
          <InfoText isTotal>Tổng cộng: 4.640.000đ</InfoText>
        </ContentRow>
        <ContentRow>
          <Link
            onClick={this.continueShopping}
            content="Tiếp tục mua sắm"
            iconType="fas fa-chevron-left"
          />
        </ContentRow>
        <ContentRow>
          <Button onClick={this.checkout} title="Thanh toán" width="250px" />
        </ContentRow>
      </Wrapper>
    );
  }
}

export default CartInfo;
