import React, { Component } from 'react';
import Button from '../../../elements/Button';

class LoginPage extends Component {
  onClick = () => {
    this.props.onLogin(true);
  }

  render() {
    return (
      <div>
        <Button title="Đăng nhập" onClick={this.onClick}/>
      </div>
    );
  }
}

export default LoginPage;
