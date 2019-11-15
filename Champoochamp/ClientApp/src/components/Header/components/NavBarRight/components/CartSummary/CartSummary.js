import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';

import {
  colors,
  typography,
  breakpoint
} from '../../../../../../shared/principles';
import { Image, Link, Button } from '../../../../../elements';

import productImg from '../../../../../../assets/images/products/000105_1.jpg';

const Wrapper = styled('div')`
  padding: 40px;

  ${breakpoint.sm`
    padding: 40px 20px;
  `}
`;

const Title = styled('h4')`
  ${typography.mdTitle};
`;

const CartItemList = styled('ul')`
  border-bottom: 1px solid ${colors.gray};
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

const CartItem = styled('li')`
  padding: 10px 0;
`;

const ProductName = styled('span')`
  font-weight: 700;
`;

const ProductPrice = styled('div')`
  text-align: right;
`;

const TotalWrapper = styled('div')`
  padding: 30px 0;
`;

const TotalTitle = styled('span')`
  ${typography.smTitle};
`;

const TotalPrice = styled('div')`
  ${typography.smTitle};
  text-align: right;
`;

const BackButton = styled('div')`
  margin-top: 20px;
`;

class CartSummary extends Component {
  render() {
    const { onCloseCartDrawer } = this.props;

    return (
      <Wrapper>
        <Title>Giỏ hàng</Title>
        <CartItemList>
          <CartItem>
            <Row gutter={16}>
              <Col span={4}>
                <Image imageUrl={productImg} />
              </Col>
              <Col span={12}>
                <ProductName>2 x Summer tee CJ04</ProductName>
                <Link content="Xoá" />
              </Col>
              <Col span={8}>
                <ProductPrice>970.000đ</ProductPrice>
              </Col>
            </Row>
          </CartItem>
          <CartItem>
            <Row gutter={16}>
              <Col span={4}>
                <Image imageUrl={productImg} />
              </Col>
              <Col span={12}>
                <ProductName>4 x Summer tee CJ04</ProductName>
                <Link content="Xoá" />
              </Col>
              <Col span={8}>
                <ProductPrice>250.000đ</ProductPrice>
              </Col>
            </Row>
          </CartItem>
          <CartItem>
            <Row gutter={16}>
              <Col span={4}>
                <Image imageUrl={productImg} />
              </Col>
              <Col span={12}>
                <ProductName>1 x Gee CJ04 tee CJ04</ProductName>
                <Link content="Xoá" />
              </Col>
              <Col span={8}>
                <ProductPrice>1.260.000đ</ProductPrice>
              </Col>
            </Row>
          </CartItem>
        </CartItemList>
        <TotalWrapper>
          <Row gutter={8}>
            <Col span={12}>
              <TotalTitle>Tổng cộng</TotalTitle>
            </Col>
            <Col span={12}>
              <TotalPrice>4.260.000đ</TotalPrice>
            </Col>
          </Row>
        </TotalWrapper>
        <Button title="Xem giỏ hàng" isBlockButton />
        <BackButton>
          <Link
            content="Tiếp tục mua sắm"
            iconType="fas fa-chevron-left"
            onClick={onCloseCartDrawer}
          />
        </BackButton>
      </Wrapper>
    );
  }
}

export default CartSummary;
