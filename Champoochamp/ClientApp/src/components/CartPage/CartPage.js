import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

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
      isLoading: true,
      strShoppingCart: null,
      quantity: null,
      shoppingCartList: []
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = user => {
    const url = `Cart/GetShoppingCart-${
      user ? user.Email : null
    } || ${localStorage.getItem(storageShoppingCartKey)}`;

    callAPI(url).then(res =>
      this.setState({
        isLoading: false,
        shoppingCartList: res.data
      })
    );
  };

  handleChange = e => {
    this.setState({ quantity: e.target.value });
  };

  onUpdateQuantity = productVariantId => {
    const { quantity, shoppingCartList } = this.state;
    const { user } = this.props;

    shoppingCartList.find(
      p => p.productVariant.id === productVariantId
    ).quantity = parseInt(quantity, 10);

    this.setState(
      {
        strShoppingCart: getStrShoppingCart(shoppingCartList)
      },
      () =>
        updateShoppingCart(
          this.state.strShoppingCart,
          user,
          this.props.updateCartTotalQuantity
        )
    );
  };

  onDeleteProduct = productVariantId => {
    const { shoppingCartList } = this.state;
    const { user } = this.props;
    const shoppingCartListNew = shoppingCartList.filter(
      p => p.productVariant.id !== productVariantId
    );

    this.setState(
      {
        strShoppingCart: getStrShoppingCart(shoppingCartListNew),
        shoppingCartList: shoppingCartListNew
      },
      () =>
        updateShoppingCart(
          this.state.strShoppingCart,
          user,
          this.props.updateCartTotalQuantity
        )
    );
  };

  renderCartItem = shoppingCartList =>
    shoppingCartList.map(item => {
      const { quantity } = this.state;

      return (
        <div key={item.productVariant.id}>
          <div>Tên: {item.productVariant.product.name}</div>
          <div>Giá: {item.productVariant.product.promotionPrice}</div>
          <div>Màu: {item.productVariant.color.name}</div>
          <div>Kích cỡ: {item.productVariant.size.name}</div>
          <div>
            <label>
              Số lượng:
              <input
                type="text"
                name="name"
                value={quantity ? quantity : item.quantity}
                onChange={this.handleChange}
                onBlur={() => this.onUpdateQuantity(item.productVariant.id)}
              />
            </label>
          </div>
          <button onClick={() => this.onDeleteProduct(item.productVariant.id)}>
            Xóa
          </button>
          <br />
          <br />
        </div>
      );
    });

  render() {
    const { isLoading, shoppingCartList } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
      <PageContainer>
        <Section>
          <SectionTitle content="Giỏ hàng" />
          <CartItemList />
          <CartInfo />
        </Section>

        {/* {this.renderCartItem(shoppingCartList)}
        <NavLink to={`/thanh-toan`}>Tới trang thanh toán</NavLink> */}
      </PageContainer>
    );
  }
}

export default CartPage;
