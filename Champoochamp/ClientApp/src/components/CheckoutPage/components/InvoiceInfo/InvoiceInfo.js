import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form, Input } from 'antd';
import styled from '@emotion/styled';

import { formatForm } from '../../../../shared/utils';
import { Link } from '../../../elements';

const Wrapper = styled('div')`
  ${formatForm};
  margin-top: 30px;
`;

class InvoiceInfo extends Component {
  login = () => {
    // Go to Login page here.
  };

  render() {
    const { user, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <NavLink to="/dang-nhap">
          <Link content="Đăng nhập" onClick={this.login} />
        </NavLink>

        <Wrapper>
          <Form.Item>
            {getFieldDecorator('lastName', {
              initialValue: user && user.lastName,
              rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }]
            })(<Input placeholder="Họ tên" />)}
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('telephone', {
                  initialValue: user && user.telephone,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!'
                    }
                  ]
                })(<Input placeholder="Số điện thoại" />)}
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: user && user.email,
                  rules: [{ required: true, message: 'Vui lòng nhập email!' }]
                })(<Input placeholder="Email" type="email" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('province', {
                  initialValue: user && user.province,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập tỉnh / thành phố!'
                    }
                  ]
                })(<Input placeholder="Tỉnh / thành phố" />)}
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('district', {
                  initialValue: user && user.district,
                  rules: [
                    { required: true, message: 'Vui lòng nhập quận / huyện!' }
                  ]
                })(<Input placeholder="Quận / huyện" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('ward', {
                  initialValue: user && user.ward,
                  rules: [{ required: true, message: 'Vui lòng nhập phường!' }]
                })(<Input placeholder="Phường" />)}
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: user && user.address,
                  rules: [
                    { required: true, message: 'Vui lòng nhập số nhà, đường!' }
                  ]
                })(<Input placeholder="Số nhà, đường" />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            {getFieldDecorator('message')(
              <Input.TextArea
                placeholder="Lời nhắn"
                autosize={{ minRows: 5, maxRows: 10 }}
              />
            )}
          </Form.Item>
        </Wrapper>
      </Fragment>
    );
  }
}

export default InvoiceInfo;
