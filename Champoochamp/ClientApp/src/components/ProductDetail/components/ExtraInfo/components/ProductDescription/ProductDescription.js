import React, { Component } from 'react';
import styled from '@emotion/styled';

import { typography } from '../../../../../../shared/principles';
import { AwesomeIcon } from '../../../../../elements';

const Wrapper = styled('ul')`
  list-style: none;
  padding: 10px 0;
`;

const Item = styled('li')`
  ${typography.body};
  margin-bottom: 15px;
`;

const Content = styled('span')`
  margin-left: 10px;
`;

class ProductDescription extends Component {
  render() {
    return (
      <Wrapper>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
        <Item>
          <AwesomeIcon type="fas fa-angle-right" />
          <Content>Chất liệu: 90% vải cotton và 10% vải thun</Content>
        </Item>
      </Wrapper>
    );
  }
}

export default ProductDescription;
