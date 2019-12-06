import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, typography, breakpoint } from '../../../../shared/principles';
import { getImageUrl, formatMoney } from '../../../../shared/utils';
import { imagesGroup } from '../../../../shared/constants';

import { Image, QuantityInput, Link } from '../../../elements';

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
  color: ${colors.black};
  text-align: right;
`;

const OriginalPrice = styled('div')`
  ${typography.lightText};
  text-align: right;
  text-decoration: line-through;
`;

class CartItemList extends Component {
  onClickProductName = (history, product) => {
    history.push(`/chi-tiet/${product.metaTitle}-${product.id}`);
  };

  renderCartItem = shoppingCartList =>
    shoppingCartList.map(item => {
      const { onUpdateQuantity, onDeleteProduct, history } = this.props;
      const { product, color, size, id, thumbnail, quantity } = item.productVariant;

      return (
        <CartItem key={id}>
          <Row gutter={16}>
            <Col xs={6} sm={4} lg={3}>
              <Image imageUrl={getImageUrl(thumbnail, imagesGroup.products)} />
            </Col>
            <Col xs={18} sm={11} lg={12}>
              <ProductName
                onClick={() => this.onClickProductName(history, product)}
              >
                {product.name}
              </ProductName>
              <ProductVariant>
                {color.name}, {size.name}
              </ProductVariant>
              {product.discountAmount > 0 && (
                <Discount>- {Math.ceil(product.discountAmount)}%</Discount>
              )}
              <DeleteButton>
                <Link onClick={() => onDeleteProduct(id)} content="Xoá" />
              </DeleteButton>
            </Col>
            <Col xs={24} sm={9}>
              <QuantityPriceWrapper>
                <QuantityInput
                  productVariantId={id}
                  value={item.quantity}
                  callback={onUpdateQuantity}
                  quantityMax={quantity}
                  width="120px"
                />
                <PriceWrapper>
                  <Price>
                    {formatMoney(product.promotionPrice * item.quantity, true)}đ
                  </Price>
                  {product.discountAmount > 0 && (
                    <OriginalPrice>
                      {formatMoney(product.price * item.quantity, true)}đ
                    </OriginalPrice>
                  )}
                </PriceWrapper>
              </QuantityPriceWrapper>
            </Col>
          </Row>
        </CartItem>
      );
    });

  render() {
    const { shoppingCartList } = this.props;

    return <Wrapper>{this.renderCartItem(shoppingCartList)}</Wrapper>;
  }
}

export default withRouter(CartItemList);
