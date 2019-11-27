import React, { Component } from "react";
import { Form, Input, Button } from 'antd';

import { callAPI, formatMoney, getTotalMoney, updateShoppingCart } from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';

import { TextInput } from '../elements';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
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

  getMessage = message => {
    this.setState({ message })
  }

  onSubmit = e => {
    e.preventDefault();    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { shoppingCartList, message } = this.state;
        const { user, discount, history } = this.props;
        const data = {
          user: values,
          shoppingCartList,
          message,
          discount,
          total: formatMoney(getTotalMoney(shoppingCartList, discount && discount.rate))
        }

        callAPI('Payment/SaveInVoice', '', 'POST', data).then(res => {
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
      <div>
        <br />
        <br />
        <br />
        <br />
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
              <Input />
            )}
          </Form.Item>          
          <Form.Item>
            {getFieldDecorator('firstName', {
              initialValue: user && user.firstName,
              rules: [{ required: true, message: 'Vui lòng nhập họ!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('lastName', {
              initialValue: user && user.lastName,
              rules: [{ required: true, message: 'Vui lòng nhập tên!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('telephone', {
              initialValue: user && user.telephone,
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('province', {
              initialValue: user && user.province,
              rules: [{ required: true, message: 'Vui lòng nhập tỉnh!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('district', {
              initialValue: user && user.district,
              rules: [{ required: true, message: 'Vui lòng nhập huyện!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('ward', {
              initialValue: user && user.ward,
              rules: [{ required: true, message: 'Vui lòng nhập đường!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              initialValue: user && user.address,
              rules: [{ required: true, message: 'Vui lòng nhập địa chỉ!' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            <TextInput callback={this.getMessage} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'customerCheckout' })(Payment);