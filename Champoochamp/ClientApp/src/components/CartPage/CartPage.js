import React, { Component } from 'react';

import {
  callAPI,
  updateShoppingCart,
  getStrShoppingCart
} from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';

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
    const localStrShoppingCart = localStorage.getItem(storageShoppingCartKey);
    const url = `Cart/GetShoppingCart-${
      user ? user.email : null
      }||${localStrShoppingCart ? localStrShoppingCart : null}`;

    callAPI(url).then(res => this.setState({
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
