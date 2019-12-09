import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, notification } from 'antd';
import styled from '@emotion/styled';

import {
  colors,
  typography,
  breakpoint
} from '../../../../../../shared/principles';
import {
  callAPI,
  getImageUrl,
  formatMoney,
  getTotalMoney,
  getStrShoppingCart,
  updateShoppingCart
} from '../../../../../../shared/utils';
import {
  localStorageKey,
  imagesGroup,
  time
} from '../../../../../../shared/constants';

import { Image, Link, Button, SectionTitle } from '../../../../../elements';

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
  color: ${colors.black};
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
  constructor(props) {
    super(props);
    this.state = {
      isUserChanged: false,
      user: props.user,
      isShoppingCartChanged: false,
      strShoppingCart: props.strShoppingCart,
      shoppingCartList: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.strShoppingCart !== prevState.strShoppingCart) {
      return {
        strShoppingCart: nextProps.strShoppingCart,
        isShoppingCartChanged: true
      };
    } else if (nextProps.user !== prevState.user) {
      return {
        user: nextProps.user,
        isUserChanged: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { user, isUserChanged, isShoppingCartChanged } = this.state;

    if (isShoppingCartChanged || isUserChanged) {
      this.getShoppingCart(user);
    }
  }

  componentDidMount() {
    this.getShoppingCart(this.state.user);
  }

  getShoppingCart = user => {
    const url = 'Cart/GetShoppingCart';
    const data = {
      email: user && user.email,
      shoppingCarts: `${localStorage.getItem(
        localStorageKey.storageShoppingCartKey
      )}`
    };

    callAPI(url, '', 'POST', data).then(res =>
      this.setState(
        {
          isShoppingCartChanged: false,
          shoppingCartList: res ? res.data : []
        },
        () => {
          if (this.state.isUserChanged) {
            this.setState({ isUserChanged: false });
            updateShoppingCart(
              getStrShoppingCart(this.state.shoppingCartList),
              user,
              this.props.updateShoppingCart
            );
          }
        }
      )
    );
  };

  onDeleteProduct = productVariantId => {
    const { user, shoppingCartList } = this.state;
    const shoppingCartListNew = shoppingCartList.filter(
      p => p.productVariant.id !== productVariantId
    );

    updateShoppingCart(
      getStrShoppingCart(shoppingCartListNew),
      user,
      this.props.updateShoppingCart
    );

    notification.info({
      message: 'Xóa sản phẩm thành công!',
      placement: 'topRight',
      onClick: () => notification.destroy(),
      duration: time.durationNotification
    });
  };

  renderCartItem = shoppingCartList =>
    shoppingCartList.map(item => {
      const { product, id, thumbnail } = item.productVariant;

      return (
        <CartItem key={id}>
          <Row gutter={16}>
            <Col span={4}>
              <Image imageUrl={getImageUrl(thumbnail, imagesGroup.products)} />
            </Col>
            <Col span={12}>
              <ProductName>
                {item.quantity} x {product.name}
              </ProductName>
              <Link onClick={() => this.onDeleteProduct(id)} content="Xoá" />
            </Col>
            <Col span={8}>
              <ProductPrice>
                {formatMoney(product.promotionPrice * item.quantity, true)}đ
              </ProductPrice>
            </Col>
          </Row>
        </CartItem>
      );
    });

  render() {
    const { shoppingCartList } = this.state;
    const { onCloseDrawer } = this.props;

    return (
      <Wrapper>
        <SectionTitle content="Giỏ hàng" />
        {shoppingCartList.length > 0 ? (
          <Fragment>
            <CartItemList>{this.renderCartItem(shoppingCartList)}</CartItemList>
            <TotalWrapper>
              <Row gutter={8}>
                <Col span={12}>
                  <TotalTitle>Tổng cộng</TotalTitle>
                </Col>
                <Col span={12}>
                  <TotalPrice>
                    {formatMoney(getTotalMoney(shoppingCartList), true)}đ
                  </TotalPrice>
                </Col>
              </Row>
            </TotalWrapper>
            <NavLink to={`/gio-hang`}>
              <Button
                title="Xem giỏ hàng"
                isBlockButton
                onClick={onCloseDrawer}
              />
            </NavLink>
          </Fragment>
        ) : (
          <span>Không có sản phẩm trong giỏ hàng</span>
        )}
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
