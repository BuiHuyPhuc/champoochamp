import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';

import { typography } from '../../../../shared/principles';
import { callAPI, formatMoney, getTotalMoney } from '../../../../shared/utils';

import { TextInput, Button, Link, Dialog } from '../../../elements';

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
  constructor(props) {
    super(props);
    this.state = {
      discount: null
    };
  }

  applyDiscountCode = code => {
    if (code && code!=='') {
      const url = `Discount/GetDiscountByCode-${code}`;

      callAPI(url).then(res => this.setState(
        {
          discount: res.data
        }, () => {
          if (!this.state.discount) {
            alert('Mã giảm giá không chính xác!')
          }
        }
      ));
    }
    else {
      this.setState({ discount: null })
    }
  };

  checkout = () => {
    const { discount } = this.state;
    const { getDiscount, history } = this.props;
    getDiscount(discount);
    history.push(`/thanh-toan`);
  };

  continueShopping = () => {
    this.props.history.push(`/`);
  };

  render() {
    const { discount } = this.state;
    const { shoppingCartList } = this.props;
    const discountAmount = discount ? discount.rate : 0;
    const tempMoney = formatMoney(getTotalMoney(shoppingCartList), false);
    const discountMoney = formatMoney(tempMoney * discountAmount / 100, false);
    const totalMoney = tempMoney - discountMoney;

    return (
      <Wrapper>
        <ContentRow>
          <InfoText>Tạm tính: {formatMoney(tempMoney, true)}đ</InfoText>
        </ContentRow>
        {
          discountAmount > 0 &&
          <ContentRow>
            <InfoText>Giảm giá: -{formatMoney(discountMoney, true)}đ</InfoText>
          </ContentRow>
        }        
        <ContentRow>
          <TextInput
            id="name"
            placeholder="Nhập mã giảm giá"
            width="200px"
            callback={this.applyDiscountCode}
          />
        </ContentRow>
        <ContentRow>
          <InfoText isTotal>Tổng cộng: {formatMoney(totalMoney, true)}đ</InfoText>
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

export default withRouter(CartInfo);
