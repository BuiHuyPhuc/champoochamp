import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Checkbox } from 'antd';
import styled from '@emotion/styled';

import {
  callAPI,
  setCookie,
  formatForm,
  formatCheckbox
} from '../../shared/utils';
import { localStorageKey, viewportWidth } from '../../shared/constants';
import { colors } from '../../shared/principles';

import { PageContainer, Button, SectionTitle, Link } from '../elements';

const Wrapper = styled('div')`
  ${formatForm};
  ${formatCheckbox};
  display: flex;
  height: 80vh;
`;

const LoginForm = styled(Form)`
  margin: auto;
  max-width: ${viewportWidth.sm}px;
  width: 100%;
`;

const RegisterContainer = styled('div')`
  display: flex;
  margin-bottom: 15px;
`;

const RegisterText = styled('span')`
  color: ${colors.darkGray};
  margin-right: 5px;
`;

const LoginButton = styled(Button)`
  margin-bottom: 15px;
`;

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
            setCookie(localStorageKey.emailKey, values.email, 1);
            setCookie(localStorageKey.passwordKey, values.password, 1);
            history.goBack();
            alert('Đăng nhập thanh công!');
          } else {
            alert('Email hoặc mật khẩu không chính xác!');
          }
        });
      }
    });
  };

  rememberMe = () => {
    // Handle remember me here.
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <PageContainer>
        <Wrapper>
          <LoginForm onSubmit={this.onSubmit}>
            <SectionTitle content="Đăng nhập" />
            <RegisterContainer>
              <RegisterText>Chưa có tài khoản?</RegisterText>
              <NavLink to="/dang-ki">
                <Link content="Đăng kí" />
              </NavLink>
            </RegisterContainer>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Vui lòng nhập email!' }]
              })(<Input type="email" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
              })(<Input type="password" placeholder="Mật khẩu" />)}
            </Form.Item>
            <Form.Item>
              <Checkbox onChange={this.rememberMe}>Giữ tôi đăng nhập</Checkbox>
            </Form.Item>
            <LoginButton title="Đăng nhập" htmlType="submit" isBlockButton />
            <NavLink to="/quen-mat-khau">
              <Link content="Quên mật khẩu?" />
            </NavLink>
          </LoginForm>
        </Wrapper>
      </PageContainer>
    );
  }
}

export default Form.create({ name: 'login' })(LoginPage);
