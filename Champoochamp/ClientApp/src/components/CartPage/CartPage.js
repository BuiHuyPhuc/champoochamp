import React, { Component } from 'react';
import { notification } from 'antd';

import {
  callAPI,
  updateShoppingCart,
  getStrShoppingCart
} from '../../shared/utils';
import { localStorageKey, time } from '../../shared/constants';

import { PageContainer, Section, SectionTitle } from '../elements';
import CartItemList from './components/CartItemList';
import CartInfo from './components/CartInfo';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }

    return null;
  }

  componentDidUpdate() {
    const { isShoppingCartChanged } = this.state;
    const { user } = this.props;

    if (isShoppingCartChanged) {
      this.getShoppingCart(user);
    }
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = user => {
    const url = 'Cart/GetShoppingCart';
    const data = {
      email: user && user.email,
      shoppingCarts: `${localStorage.getItem(localStorageKey.storageShoppingCartKey)}`
    };

    callAPI(url, '', 'POST', data).then(res => this.setState({
      isShoppingCartChanged: false,
      shoppingCartList: res.data
    }));
  };

  onUpdateQuantity = (productVariantId, quantity) => {
    const { shoppingCartList } = this.state;
    const { user } = this.props;

    shoppingCartList.find(
      p => p.productVariant.id === productVariantId
    ).quantity = parseInt(quantity, 10);

    updateShoppingCart(
      getStrShoppingCart(shoppingCartList),
      user,
      this.props.updateShoppingCart
    );
  };

  onDeleteProduct = productVariantId => {
    const { shoppingCartList } = this.state;
    const { user } = this.props;
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
      duration: time.durationNotification,
    });
  };

  render() {
    const { shoppingCartList } = this.state;
    const { getDiscount } = this.props;
    
    return (
      <PageContainer>
        <Section>
          <SectionTitle content="Giỏ hàng" />
          <CartItemList shoppingCartList={shoppingCartList} onUpdateQuantity={this.onUpdateQuantity} onDeleteProduct={this.onDeleteProduct} />
          <CartInfo shoppingCartList={shoppingCartList} getDiscount={getDiscount} />
        </Section>
      </PageContainer>
    );
  }
}

export default CartPage;
