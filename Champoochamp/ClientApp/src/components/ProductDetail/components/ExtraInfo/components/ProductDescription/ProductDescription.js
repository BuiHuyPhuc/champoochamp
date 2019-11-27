import React, { Component } from 'react';
import styled from '@emotion/styled';

import { AwesomeIcon } from '../../../../../elements';

const Wrapper = styled('ul')`
  list-style: none;
  padding: 10px 0;
`;

const Item = styled('li')`
  margin-bottom: 15px;
`;

const Content = styled('span')`
  margin-left: 10px;
`;

class ProductDescription extends Component {
  render() {
    const { product } = this.props;
    
    return (
      <Wrapper>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: {product.material.name}</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Thương hiệu: {product.brand.name}</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Thời hạn bảo hành: {product.warrantyPeriod}</Content>
        </Item>        
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chi tiết: {product.detail}</Content>
        </Item>
      </Wrapper>
    );
  }
}

export default ProductDescription;
