import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';

import {
  colors,
  typography,
  breakpoint
} from '../../../../../../shared/principles';
import { Image, Link, Button, SectionTitle } from '../../../../../elements';

import productImg from '../../../../../../assets/images/products/00001005_1.jpg';

const Wrapper = styled('div')`
  padding: 40px;

  ${breakpoint.sm`
    padding: 40px 20px;
  `}
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
  ${typography.boldText};
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
    const { onCloseDrawer } = this.props;

    return (
      <Wrapper>
        <SectionTitle content="Giỏ hàng" />

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

        <NavLink to={`/gio-hang`}>
          <Button title="Xem giỏ hàng" isBlockButton onClick={onCloseDrawer} />
        </NavLink>

        <BackButton>
          <Link
            content="Quay lại"
            iconType="fas fa-chevron-left"
            onClick={onCloseDrawer}
          />
        </BackButton>
      </Wrapper>
    );
  }
}

export default CartSummary;
