import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import styled from '@emotion/styled';

import { typography } from '../../shared/principles';

const SmallTitle = styled('h4')`
  ${typography.smTitle};
`;

class InvoiceInfo extends Component {
  render() {

    return (
      <div>
        <Row gutter={32}>
          <Col xs={24} sm={14}></Col>
          <Col xs={24} sm={10}></Col>
        </Row>
      </div>
    );
  }
}

export default InvoiceInfo;
