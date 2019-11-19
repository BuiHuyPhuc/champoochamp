import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import callAPI from '../../shared/utils/callAPI';

class LoginAdminPage extends Component {
  constructor(props) {
    super(props);
    props.onRenderMenu(false);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const url = `Employee/CheckLogin`;
        callAPI(url, '', 'POST', values).then(res => res && res.data && this.props.onLoginAdmin(true));        
      }
    });
  }

  render() {
    const { isLoginAdminSuccess, history } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
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
        {isLoginAdminSuccess && history.push(`/admin`)}
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(LoginAdminPage);
