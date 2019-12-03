import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form, Input } from 'antd';
import styled from '@emotion/styled';

import {
  callAPI,
  setCookie,
  formatForm,
  formatCheckbox
} from '../../shared/utils';
import { emailKey, passwordKey, viewportWidth } from '../../shared/constants';
import { colors, breakpoint } from '../../shared/principles';

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

  ${breakpoint.md`
    margin-top: 30px;
  `}
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

class RegisterPage extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history, getLoginUser } = this.props;
        callAPI('User/Register', '', 'POST', values).then(res => {
          if (res.data) {
            getLoginUser(res.data);
            setCookie(emailKey, res.data.email, 1);
            setCookie(passwordKey, res.data.password, 1);
            history.push('/');
          } else {
            alert('Đăng ký thất bại!');
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <PageContainer>
        <Wrapper>
          <LoginForm onSubmit={this.onSubmit}>
            <SectionTitle content="Đăng kí" />
            <RegisterContainer>
              <RegisterText>Đã có tài khoản?</RegisterText>
              <NavLink to="/dang-nhap">
                <Link content="Đăng nhập" />
              </NavLink>
            </RegisterContainer>

            <Form.Item>
              {getFieldDecorator('fullName', {
                rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }]
              })(<Input placeholder="Họ tên *" />)}
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Vui lòng nhập email!' }]
                  })(<Input placeholder="Email *" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!'
                      }
                    ]
                  })(<Input placeholder="Số điện thoại *" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập mật khẩu!' }
                    ]
                  })(<Input type="password" placeholder="Mật khẩu *" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('rePassword', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập lại mật khẩu!' }
                    ]
                  })(
                    <Input type="password" placeholder="Nhập lại mật khẩu *" />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('province', {
                    rules: [{ message: 'Vui lòng nhập tỉnh!' }]
                  })(<Input placeholder="Tỉnh / thành phố" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('district', {
                    rules: [{ message: 'Vui lòng nhập huyện!' }]
                  })(<Input placeholder="Quận / huyện" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('ward', {
                    rules: [{ message: 'Vui lòng nhập phường!' }]
                  })(<Input placeholder="Phường" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('address', {
                    rules: [{ message: 'Vui lòng nhập số nhà, đường!' }]
                  })(<Input placeholder="Số nhà, đường" />)}
                </Form.Item>
              </Col>
            </Row>
            <LoginButton title="Đăng kí" htmlType="submit" isBlockButton />
          </LoginForm>
        </Wrapper>
      </PageContainer>
    );
  }
}

export default Form.create({ name: 'register' })(RegisterPage);
