import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

import { callAPI, setCookie } from '../../shared/utils';
import { emailKey, passwordKey } from '../../shared/constants';

class LoginPage extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history, getLoginUser } = this.props;
        const url = `User/CheckLogin`;
        callAPI(url, '', 'POST', values).then(res => {
          if (res.data) {
            getLoginUser(res.data);
            setCookie(emailKey, res.data.email, 1);
            setCookie(passwordKey, res.data.password, 1);
            history.goBack();
            alert("Đăng nhập thanh công!");
          }
          else {
            alert("Email hoặc mật khẩu không chính xác!");
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
        <Form onSubmit={this.onSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Vui lòng nhập tài khoản!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <NavLink to="/dang-ky">Bạn chưa có tài khoản?</NavLink>
      </div>
    );
  }
}

export default Form.create({ name: 'login' })(LoginPage);
