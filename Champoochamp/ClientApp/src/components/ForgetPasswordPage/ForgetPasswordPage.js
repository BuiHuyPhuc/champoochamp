import React, { Component, Fragment } from 'react';
import { Form, Input, notification } from 'antd';
import styled from '@emotion/styled';

import { callAPI, formatForm } from '../../shared/utils';
import { time, viewportWidth } from '../../shared/constants';

import { PageContainer, Button, SectionTitle } from '../elements';

const Wrapper = styled('div')`
  ${formatForm};
  display: flex;
  height: 80vh;
`;

const ForgetPasswordForm = styled(Form)`
  margin: auto;
  max-width: ${viewportWidth.sm}px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-bottom: 15px;
`;

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      isSendVerificationCodeSuccess: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history } = this.props;
        const url = `User/ForgetPassword`;
        callAPI(url, '', 'POST', values).then(res => {
          if (res.data) {
            notification.info({
              message: 'Đổi mật khẩu thành công!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
            history.push('/dang-nhap');
          } else {
            notification.warning({
              message: 'Email hoặc mã xác nhận không chính xác!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          }
        });
      }
    });
  };

  sendVerificationCode = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.email) {
        const url = `User/SendVerificationCode-${values.email}`;
        callAPI(url).then(res => {
          if (res.data === 1) {
            this.setState({ isSendVerificationCodeSuccess: true });

            notification.info({
              message: 'Gửi mã xác nhận thành công!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          } else if (res.data === 0) {
            notification.warning({
              message: 'Email không tồn tại!',
              placement: 'topRight',
              onClick: () => notification.destroy(),
              duration: time.durationNotification
            });
          } else {
            notification.warning({
              message: 'Gửi mã xác nhận thất bại!',
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

  render() {
    const { isSendVerificationCodeSuccess } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <PageContainer>
        <Wrapper>
          <ForgetPasswordForm onSubmit={this.onSubmit}>
            <SectionTitle content="Quên mật khẩu" />
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Vui lòng nhập email!' }]
              })(<Input type="email" placeholder="Email" />)}
            </Form.Item>
            <StyledButton
              title="Gửi mã xác nhận"
              onClick={e => this.sendVerificationCode(e)}
              isBlockButton
            />
            {isSendVerificationCodeSuccess && (
              <Fragment>
                <Form.Item>
                  {getFieldDecorator('verificationCode', {
                    rules: [
                      { required: true, message: 'Vui lòng nhập mã xác nhận!' }
                    ]
                  })(<Input type="text" placeholder="Mã xác nhận" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!'
                      },
                      { validator: this.validateToNextPassword }
                    ]
                  })(<Input type="password" placeholder="Mật khẩu mới" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('rePassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu mới!'
                      },
                      { validator: this.compareToFirstPassword }
                    ]
                  })(
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </Form.Item>
                <StyledButton
                  title="Hoàn tất"
                  htmlType="submit"
                  isBlockButton
                />
              </Fragment>
            )}
          </ForgetPasswordForm>
        </Wrapper>
      </PageContainer>
    );
  }
}

export default Form.create({ name: 'ForgetPasswordPage' })(ForgetPasswordPage);
