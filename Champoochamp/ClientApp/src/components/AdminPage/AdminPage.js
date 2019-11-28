import React, { Component } from 'react';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    const { isLoginAdminSuccess, history } = props;
    !isLoginAdminSuccess && history.push(`/admin/dang-nhap`);
  }

  render() {
    return (
      <div>
        Admin
      </div>
    );
  }
}

export default AdminPage;
