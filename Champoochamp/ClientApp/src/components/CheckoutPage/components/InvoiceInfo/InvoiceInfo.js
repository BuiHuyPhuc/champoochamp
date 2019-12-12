import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Form, Input, Select, notification } from 'antd';
import styled from '@emotion/styled';

import { callghtkAPI, formatForm } from '../../../../shared/utils';
import { champoochampAddress, ghtk, time } from '../../../../shared/constants';
import { cities, districts, wards } from '../../../../shared/address';
import { Link } from '../../../elements';

const Wrapper = styled('div')`
  ${formatForm};
  margin-top: 30px;
`;

const { Option } = Select;

class InvoiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districtsData: [],      
      wardsData: []      
    };
  }

  login = () => {
    // Go to Login page here.
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
    const { getTransportFee } = this.props;
    const url = `${ghtk.apiTransportFee}`;
    const query = `?pick_province=${champoochampAddress.city}&pick_district=${champoochampAddress.district}&province=${this.props.form.getFieldsValue().province}&district=${value}&weight=1000&transport=road`;

    callghtkAPI(url, query)
      .then(res => {
        if (res) {
          getTransportFee(res.fee);
          console.log("success");
        }
        else {
          notification.warning({
            message: 'Phí vận chuyển tạm thời không khả dụng, vui lòng tải lại trang!',
            placement: 'topRight',
            onClick: () => notification.destroy(),
            duration: time.durationNotification,
          });
        }
      });

    this.props.form.setFieldsValue({
      ward: undefined
    });

    this.setState({
      wardsData: wards[value]
    });
  };

  render() {
    const { districtsData, wardsData } = this.state;
    const { user, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <NavLink to="/dang-nhap">
          <Link content="Đăng nhập" onClick={this.login} />
        </NavLink>

        <Wrapper>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: user && user.name,
              rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }]
            })(<Input placeholder="Họ tên *" />)}
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: user && user.phone,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!'
                    }
                  ]
                })(<Input placeholder="Số điện thoại *" />)}
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: user && user.email,
                  rules: [{ required: true, message: 'Vui lòng nhập email!' }]
                })(<Input placeholder="Email *" type="email" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('province', {
                  initialValue: user ? user.province : undefined,
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
                  initialValue: user ? user.district : undefined,
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
                  initialValue: user ? user.ward : undefined,
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
            <Col xs={24} lg={12}>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: user && user.address,
                  rules: [
                    { required: true, message: 'Vui lòng nhập số nhà, đường!' }
                  ]
                })(<Input placeholder="Số nhà, đường *" />)}
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
