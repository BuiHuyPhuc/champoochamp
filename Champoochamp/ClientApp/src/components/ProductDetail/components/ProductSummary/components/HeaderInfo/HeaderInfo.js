import React, { Component } from 'react';
import styled from '@emotion/styled';

import { colors, typography } from '../../../../../../shared/principles';
import { SectionTitle } from '../../../../../elements';

const Wrapper = styled('div')`
  border-bottom: solid 1px ${colors.lightGray};
  margin-bottom: 20px;
`;

const NewTag = styled('span')`
  background: ${colors.black};
  border-radius: 20px;
  color: ${colors.white};
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
  padding: 5px 12px;
  text-transform: uppercase;
`;

const PriceWrapper = styled('div')`
  margin-bottom: 30px;
`;

const Price = styled('span')`
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;

const OriginalPrice = styled('span')`
  color: ${colors.darkGray};
  font-size: 18px;
  text-decoration: line-through;
`;

const Description = styled('p')`
  ${typography.lightBody};
  margin-bottom: 20px;
`;

class HeaderInfo extends Component {
  render() {
    return (
      <Wrapper>
        <SectionTitle content="Navigation 2019 Hunter Bet Jacket"></SectionTitle>
        <NewTag>New</NewTag>
        <PriceWrapper>
          <Price>399.000đ</Price>
          <OriginalPrice>450.000đ</OriginalPrice>
        </PriceWrapper>
        <Description>
          Bundle up in this wool-blend layer. With warm pockets, a high neck,
          and a long length for warmth, you'll be feeling total coziness.
        </Description>
      </Wrapper>
    );
  }
}

export default HeaderInfo;
