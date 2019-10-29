import React, { Component } from 'react';
import styled from '@emotion/styled';

import { SectionTitle } from '../../../elements';

const Wrapper = styled('button')`
  align-items: center;
  cursor: pointer;
  display: flex;
  outline: none;
  margin: 0;
  padding: 0;
`;

class RelatedItems extends Component {
  render() {
    return (
      <Wrapper>
        <SectionTitle content="Có thể bạn thích"></SectionTitle>
      </Wrapper>
    );
  }
}

export default RelatedItems;
