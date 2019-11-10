import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'antd';

import { colors, typography } from '../../../../shared/principles';

import { SectionTitle } from '../../../elements';
import ProductDescription from './components/ProductDescription';
import FAQs from './components/FAQs';

const Wrapper = styled('div')`
  background: ${colors.white};
`;

const SmallTitle = styled('h4')`
  ${typography.smTitle};
  font-weight: 400 !important;
`;

class ExtraInfo extends Component {
  render() {
    return (
      <Wrapper>
        <SectionTitle content="Thông tin chi tiết"></SectionTitle>
        <Row gutter={32}>
          <Col xs={24} md={12}>
            <SmallTitle>Mô tả sản phẩm</SmallTitle>
            <ProductDescription />
          </Col>
          <Col xs={24} md={12}>
            <SmallTitle>Câu hỏi thường gặp</SmallTitle>
            <FAQs />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default ExtraInfo;
