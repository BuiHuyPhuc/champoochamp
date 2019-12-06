import React, { Component } from 'react';
import InvoicePage from './components/InvoicePage';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    const { isLoginAdminSuccess, history } = props;
    !isLoginAdminSuccess && history.push(`/admin/dang-nhap`);
  }

  render() {
    return (
      <div>
        <InvoicePage />
      </div>
    );
  }
}

export default AdminPage;
