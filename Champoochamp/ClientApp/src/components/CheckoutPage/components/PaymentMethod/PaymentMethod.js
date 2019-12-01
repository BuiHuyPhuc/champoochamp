import React, { Component } from 'react';
import { Radio } from 'antd';
import styled from '@emotion/styled';

import { paymentMethod } from '../../../../shared/constants';
import { formatRadio } from '../../../../shared/utils';
import { colors } from '../../../../shared/principles';

const Wrapper = styled('div')`
  ${formatRadio};
  margin-top: 30px;
`;

const BankingInfo = styled('div')`
  background: ${colors.offWhite};
  padding: 10px 20px;
`;

const Content = styled('span')`
  color: ${colors.black};
  display: block;
  margin: 10px 0;
`;

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBankingInfo: false,
      value: paymentMethod.cod
    };
  }

  onChange = e => {
    if (e.target.value === paymentMethod.banking) {
      this.setState({
        showBankingInfo: true
      });
    } else {
      this.setState({
        showBankingInfo: false
      });
    }

    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { showBankingInfo } = this.state;
    return (
      <Wrapper>
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio value={paymentMethod.cod}>
            Thanh toán tiền mặt khi nhận hàng
          </Radio>
          <Radio value={paymentMethod.banking}>Chuyển khoản ngân hàng</Radio>
          {showBankingInfo && (
            <BankingInfo>
              <Content>Chủ tài khoản: VUONG THANH PHUONG</Content>
              <Content>Số tài khoản: 0123456789</Content>
              <Content>Ngân hàng Techcombank - chi nhánh quận 4.</Content>
            </BankingInfo>
          )}
        </Radio.Group>
      </Wrapper>
    );
  }
}

export default PaymentMethod;
