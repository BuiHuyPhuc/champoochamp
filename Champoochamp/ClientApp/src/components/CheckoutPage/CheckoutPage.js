import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import styled from '@emotion/styled';

import { callAPI } from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';
import { typography } from '../../shared/principles';

import { PageContainer, Section } from '../elements';

const SmallTitle = styled('h4')`
  ${typography.smTitle};
`;

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shoppingCartList: []
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = user => {
    const url = `Cart/GetShoppingCart-${user &&
      user.Email} || ${localStorage.getItem(storageShoppingCartKey)}`;
    callAPI(url).then(res =>
      this.setState({
        isLoading: false,
        shoppingCartList: res.data
      })
    );
  };

  onCheckout = (shoppingCartList, user) => {
    const url = `Checkout/SaveInVoice`;
    const data = user;
    const headers = {
      'Content-Type': 'application/json'
    };
    debugger;
    callAPI(url, '', 'POST', data, headers).then(res => alert('fail'));
  };

  render() {
    const { isLoading } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
      <PageContainer>
        <Row gutter={32}>
          <Col xs={24} sm={14}>
            <Section>
              <SmallTitle>Thông tin giao hàng</SmallTitle>
            </Section>
          </Col>
          <Col xs={24} sm={10}>
            <Section>
              <SmallTitle>Chi tiết đơn hàng</SmallTitle>
            </Section>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default CheckoutPage;
