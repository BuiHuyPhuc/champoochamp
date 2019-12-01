import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import styled from '@emotion/styled';

import {
  callAPI,
  formatMoney,
  getTotalMoney,
  updateShoppingCart
} from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';
import { typography } from '../../shared/principles';

import { PageContainer, Section } from '../elements';
import InvoiceInfo from './components/InvoiceInfo';
import CartInfo from './components/CartInfo';
import PaymentMethod from './components/PaymentMethod';

const SmallTitle = styled('h4')`
  ${typography.smTitle};
`;

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartList: []
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = user => {
    const url = `Cart/GetShoppingCart-${user &&
      user.email}||${localStorage.getItem(storageShoppingCartKey)}`;
    callAPI(url).then(res =>
      this.setState({
        shoppingCartList: res.data
      })
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { shoppingCartList } = this.state;
        const { user, discount, history } = this.props;
        const data = {
          user: values,
          shoppingCartList,
          message: values.message,
          discount,
          total: formatMoney(
            getTotalMoney(shoppingCartList, discount && discount.rate)
          )
        };

        callAPI('Checkout/SaveInVoice', '', 'POST', data).then(res => {
          if (res.data) {
            updateShoppingCart('', user, this.props.updateShoppingCart);
            alert('Thanh toán thành công!');
            history.push('/');
          } else {
            alert('Thanh toán thất bại!');
          }
        });
      }
    });
  };

  render() {
    const { shoppingCartList } = this.state;
    const { user, form } = this.props;

    return (
      <PageContainer>
        <Row gutter={32}>
          <Form onSubmit={this.onSubmit}>
            <Col xs={24} sm={12} md={14}>
              <Section>
                <SmallTitle>Thông tin giao hàng</SmallTitle>
                <InvoiceInfo user={user} form={form} />
              </Section>
              <Section>
                <SmallTitle>Phương thức thanh toán</SmallTitle>
                <PaymentMethod />
              </Section>
            </Col>
            <Col xs={24} sm={12} md={10}>
              <Section>
                <SmallTitle>Chi tiết đơn hàng</SmallTitle>
                <CartInfo />
              </Section>
            </Col>
          </Form>
        </Row>
      </PageContainer>
    );
  }
}

export default Form.create({ name: 'CheckoutPage' })(CheckoutPage);
