import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form, Input, Select, notification } from 'antd';
import styled from '@emotion/styled';

import {
  callAPI,
  formatForm,
  formatCheckbox
} from '../../shared/utils';
import { time, viewportWidth } from '../../shared/constants';
import { colors, breakpoint } from '../../shared/principles';
import { cities, districts, wards } from '../../shared/address';

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

const { Option } = Select;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      districtsData: [],
      wardsData: []
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history } = this.props;
        callAPI('User/Register', '', 'POST', values).then(res => {
          if (res.data === 1) {
            notification.info({
              message: 'Đăng kí thành công!',
              placement: 'topRight',
              btn: (
                <div>
                  <Button title="Đăng nhập" isSecondary onClick={() => history.push('/dang-nhap')} />
                  <Button title="Trang chủ" isSecondary onClick={() => history.push('/')} />
                </div>
              ),
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          }
          else if (res.data === 0) {
            notification.warning({
              message: 'Email đã tồn tại, vui lòng nhập email khác!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          }
          else {
            notification.warning({
              message: 'Đăng kí thất bại!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          }
        });
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['rePassword'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không trùng khớp!');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleCityChange = value => {
    this.props.form.setFieldsValue({
      district: undefined,
      ward: undefined
    });

    this.setState({
      districtsData: districts[value],
      wardsData: []
    });
  };

  handleDistrictChange = value => {
    this.props.form.setFieldsValue({
      ward: undefined
    });

    this.setState({
      wardsData: wards[value]
    });
  };

  render() {
    const { districtsData, wardsData } = this.state;
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
              {getFieldDecorator('name', {
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
                      { required: true, message: 'Vui lòng nhập mật khẩu!' },
                      { validator: this.validateToNextPassword }
                    ]
                  })(<Input type="password" placeholder="Mật khẩu *" />)}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item>
                  {getFieldDecorator('rePassword', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                      { validator: this.compareToFirstPassword }
                    ]
                  })(
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu *"
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Form.Item>
                  {getFieldDecorator('province', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng chọn tỉnh / thành phố!'
                      }
                    ],
                    onChange: this.handleCityChange
                  })(
                    <Select placeholder="Tỉnh / thành phố *">
                      {cities.map(city => (
                        <Option key={city}>{city}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item>
                  {getFieldDecorator('district', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng chọn quận / huyện!'
                      }
                    ],
                    onChange: this.handleDistrictChange
                  })(
                    <Select placeholder="Quận / huyện *">
                      {districtsData.map(district => (
                        <Option key={district}>{district}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Form.Item>
                  {getFieldDecorator('ward', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng chọn phường / xã!'
                      }
                    ],
                  })(
                    <Select placeholder="Phường / xã *">
                      {wardsData.map(ward => (
                        <Option key={ward}>{ward}</Option>
                      ))}
                    </Select>
                  )}
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

export default Form.create({ name: 'RegisterPage' })(RegisterPage);
