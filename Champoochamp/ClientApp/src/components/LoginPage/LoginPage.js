import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Checkbox, notification } from 'antd';
import styled from '@emotion/styled';

import {
  callAPI,
  setCookie,
  formatForm,
  formatCheckbox
} from '../../shared/utils';
import { localStorageKey, time, viewportWidth } from '../../shared/constants';
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
  constructor(props) {
    super(props);
    this.state = {
      isRemember: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { isRemember } = this.state;
        const { history, getLoginUser } = this.props;
        const url = `User/CheckLogin`;
        callAPI(url, '', 'POST', values).then(res => {
          if (res.data) {
            getLoginUser(res.data);

            if (isRemember) {
              setCookie(localStorageKey.emailKey, values.email, 1);
              setCookie(localStorageKey.passwordKey, values.password, 1);
            }

            notification.info({
              message: 'Đăng nhập thành công!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
            history.goBack();
          } else {
            notification.warning({
              message: 'Email hoặc mật khẩu không chính xác!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          }
        });
      }
    });
  };

  rememberMe = (e) => {
    this.setState({ isRemember: e.target.checked });
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
              <Checkbox onChange={this.rememberMe}>Ghi nhớ đăng nhập</Checkbox>
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

export default Form.create({ name: 'LoginPage' })(LoginPage);
