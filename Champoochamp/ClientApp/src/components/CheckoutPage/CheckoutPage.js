import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import styled from '@emotion/styled';

import { callAPI, formatMoney, getTotalMoney, updateShoppingCart } from '../../shared/utils';
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
      shoppingCartList: []
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = user => {
    const url = `Cart/GetShoppingCart-${user && user.email}||${localStorage.getItem(storageShoppingCartKey)}`;
    callAPI(url).then(res => this.setState({
      shoppingCartList: res.data
    }));
  }

  // getMessage = message => {
  //   this.setState({ message })
  // }

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
          total: formatMoney(getTotalMoney(shoppingCartList, discount && discount.rate))
        }

        callAPI('Checkout/SaveInVoice', '', 'POST', data).then(res => {
          if (res.data) {
            updateShoppingCart(
              '',
              user,
              this.props.updateShoppingCart
            );
            alert("Thanh toán thành công!");
            history.push('/');
          }
          else {
            alert("Thanh toán thất bại!");
          }
        });
      }
    });
  }

  render() {
    const { shoppingCartList } = this.state;
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <PageContainer>
        <Row gutter={32}>
          <Col xs={24} sm={14}>
            <Section>
              <SmallTitle>Thông tin giao hàng</SmallTitle>
              <Form onSubmit={this.onSubmit}>
          {/*
           <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Vui lòng nhập email!' }],
            })(
              <TextInput id="1" label="Email" text={user && user.email} />
            )}
          </Form.Item>
           */}
          <Form.Item>
            {getFieldDecorator('email', {
              initialValue: user && user.email,
              rules: [{ required: true, message: 'Vui lòng nhập email!' }]
            })(
              <Input placeholder="Email" />
            )}
          </Form.Item>          
          <Form.Item>
            {getFieldDecorator('lastName', {
              initialValue: user && user.lastName,
              rules: [{ required: true, message: 'Vui lòng nhập tên!' }]
            })(
              <Input placeholder="Tên" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('telephone', {
              initialValue: user && user.telephone,
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(
              <Input placeholder="Số điện thoại" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('province', {
              initialValue: user && user.province,
              rules: [{ required: true, message: 'Vui lòng nhập tỉnh!' }]
            })(
              <Input placeholder="Tỉnh, thành phố" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('district', {
              initialValue: user && user.district,
              rules: [{ required: true, message: 'Vui lòng nhập huyện!' }]
            })(
              <Input placeholder="Quận, huyện" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('ward', {
              initialValue: user && user.ward,
              rules: [{ required: true, message: 'Vui lòng nhập đường!' }]
            })(
              <Input placeholder="Đường" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              initialValue: user && user.address,
              rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }]
            })(
              <Input placeholder="Số nhà" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('message')(
              <Input placeholder="Tin nhắn" />
            )}
          </Form.Item>
          {/* <Form.Item>
            <Input callback={this.getMessage} />
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
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

export default Form.create({ name: 'CheckoutPage' })(CheckoutPage);
