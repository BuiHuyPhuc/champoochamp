import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { callAPI, setCookie } from '../../shared/utils';
import { localStorageKey } from '../../shared/constants';

class RegisterPage extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history, getLoginUser } = this.props;
        callAPI('User/Register', '', 'POST', values).then(res => {
          if (res.data) {
            getLoginUser(res.data);
            setCookie(localStorageKey.emailKey, values.email, 1);
            setCookie(localStorageKey.passwordKey, values.password, 1);
            history.push('/');
          }
          else {
            alert("Đăng ký thất bại!");
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Vui lòng nhập email!' }]
            })(
              <Input placeholder="email" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
            })(
              <Input type="password" placeholder="Mật khẩu" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Vui lòng nhập họ!' }]
            })(
              <Input placeholder="Họ" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Vui lòng nhập tên!' }]
            })(
              <Input placeholder="Tên" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(
              <Input placeholder="Số điện thoại" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('province', {
              rules: [{ required: true, message: 'Vui lòng nhập tỉnh!' }]
            })(
              <Input placeholder="Tỉnh" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('district', {
              rules: [{ required: true, message: 'Vui lòng nhập huyện!' }]
            })(
              <Input placeholder="Quận" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('ward', {
              rules: [{ required: true, message: 'Vui lòng nhập đường!' }]
            })(
              <Input placeholder="Đường" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Vui lòng nhập số nhà!' }]
            })(
              <Input placeholder="Số nhà" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'register' })(RegisterPage);
