import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';

import { colors, typography, breakpoint } from '../../../../shared/principles';

import { Image, QuantityInput, Link } from '../../../elements';

import productImg from '../../../../assets/images/products/00001005_1.jpg';

const Wrapper = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CartItem = styled('li')`
  border-bottom: 1px solid ${colors.gray};
  padding: 25px 0;
`;

const ProductName = styled('a')`
  ${typography.boldText};
  color: ${colors.black};
  display: block;

  &:hover {
    color: ${colors.black};
    text-decoration: underline;
  }
`;

const ProductVariant = styled('span')`
  ${typography.lightText};
`;

const Discount = styled('span')`
  background: ${colors.black};
  border-radius: 20px;
  color: ${colors.white};
  display: inline-block;
  font-size: 10px;
  margin-left: 10px;
  padding: 2px 8px;
`;

const DeleteButton = styled('div')`
  margin-top: 5px;
`;

const QuantityPriceWrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  ${breakpoint.md`
    align-items: flex-end;
    flex-direction: column;
  `}

  ${breakpoint.sm`
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
  `}
`;

const PriceWrapper = styled('div')`
  ${breakpoint.md`
    margin-top: 10px;
  `}

  ${breakpoint.sm`
    margin-top: 0;
  `}
`;

const Price = styled('div')`
  ${typography.boldText};
  text-align: right;
`;

const OriginalPrice = styled('div')`
  ${typography.lightText};
  text-align: right;
  text-decoration: line-through;
`;

class CartItemList extends Component {
  callback = () => {
    // get product quantity here
  };

  render() {
    return (
      <Wrapper>
        <CartItem>
          <Row gutter={16}>
            <Col xs={6} sm={4} lg={3}>
              <Image imageUrl={productImg} />
            </Col>
            <Col xs={18} sm={11} lg={12}>
              <ProductName href="/">
                HnM T-shirt cotton summer collection
              </ProductName>
              <ProductVariant>Xám, 39</ProductVariant>
              <Discount>- 20%</Discount>
              <DeleteButton>
                <Link content="Xoá" />
              </DeleteButton>
            </Col>
            <Col xs={24} sm={9}>
              <QuantityPriceWrapper>
                <QuantityInput callback={this.callback} width="120px" />
                <PriceWrapper>
                  <Price>5.680.000đ</Price>
                  <OriginalPrice>7.200.000đ</OriginalPrice>
                </PriceWrapper>
              </QuantityPriceWrapper>
            </Col>
          </Row>
        </CartItem>
        <CartItem>
          <Row gutter={16}>
            <Col xs={6} sm={4} lg={3}>
              <Image imageUrl={productImg} />
            </Col>
            <Col xs={18} sm={11} lg={12}>
              <ProductName href="/">
                HnM T-shirt cotton summer collection
              </ProductName>
              <ProductVariant>Xám, 39</ProductVariant>
              <Discount>- 12%</Discount>
              <DeleteButton>
                <Link content="Xoá" />
              </DeleteButton>
            </Col>
            <Col xs={24} sm={9}>
              <QuantityPriceWrapper>
                <QuantityInput callback={this.callback} width="120px" />
                <PriceWrapper>
                  <Price>460.000đ</Price>
                  <OriginalPrice>650.000đ</OriginalPrice>
                </PriceWrapper>
              </QuantityPriceWrapper>
            </Col>
          </Row>
        </CartItem>
      </Wrapper>
    );
  }
}

export default CartItemList;
