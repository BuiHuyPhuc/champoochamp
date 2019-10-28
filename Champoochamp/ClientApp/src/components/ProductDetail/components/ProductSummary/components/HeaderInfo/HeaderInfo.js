import React, { Component } from 'react';
import styled from '@emotion/styled';

import { colors, typography } from '../../../../../../shared/principles';
import { checkNewProduct } from '../../../../../../shared/utils';

const Wrapper = styled('div')`
  border-bottom: solid 1px ${colors.lightGray};
  padding-bottom: 10px;
`;

const ProductName = styled('h3')`
  ${typography.mdTitle};
  margin-bottom: 10px;
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
`;

class HeaderGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: checkNewProduct(props.product.createdDate)
    };
  }

  render() {
    const { isNew } = this.state;
    const { product } = this.props;

    return (
      <Wrapper>
        <ProductName>{product.name}</ProductName>
        {isNew ? <NewTag>New</NewTag> : null}
        <PriceWrapper>
          <Price>{product.promotionPrice.toLocaleString()} VND</Price>
          <OriginalPrice>{product.price.toLocaleString()} VND</OriginalPrice>
        </PriceWrapper>
        <Description>{product.description}</Description>
      </Wrapper>
    );
  }
}

export default HeaderGroup;
