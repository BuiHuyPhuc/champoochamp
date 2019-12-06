import React, { Component } from 'react';
import styled from '@emotion/styled';

import { colors, typography } from '../../../../../../shared/principles';
import { checkNewProduct, formatMoney } from '../../../../../../shared/utils';

import { SectionTitle } from '../../../../../elements';

const Wrapper = styled('div')`
  border-bottom: solid 1px ${colors.lightGray};
  margin-bottom: 20px;
`;

const NewTag = styled('span')`
  ${typography.semiBoldText};
  background: ${colors.black};
  border-radius: 20px;
  color: ${colors.white};
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
  padding: 5px 12px;
  text-transform: uppercase;
`;

const PriceWrapper = styled('div')`
  margin-bottom: 30px;
`;

const Price = styled('span')`
  ${typography.semiBoldText};
  font-size: 18px;
  margin-right: 10px;
`;

const OriginalPrice = styled('span')`
  color: ${colors.darkGray};
  font-size: 18px;
  text-decoration: line-through;
`;

const Description = styled('p')`
  ${typography.lightText};
  margin-bottom: 20px;
`;

class HeaderInfo extends Component {
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
        <SectionTitle content={product.name}></SectionTitle>
        {isNew && <NewTag>New</NewTag>}
        <PriceWrapper>
          <Price>{formatMoney(product.promotionPrice, true)}đ</Price>
          {product.discountAmount > 0 && (
            <OriginalPrice>{formatMoney(product.price, true)}đ</OriginalPrice>
          )}
        </PriceWrapper>
        <Description>{product.description}</Description>
      </Wrapper>
    );
  }
}

export default HeaderInfo;
