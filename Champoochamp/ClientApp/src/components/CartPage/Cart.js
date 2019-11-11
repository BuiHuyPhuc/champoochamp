import React, { Component } from "react";
import { Spin } from 'antd';
import { NavLink } from 'react-router-dom';

import { callAPI, updateShoppingCart, getStrShoppingCart } from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      strShoppingCart: null,
      quantity: null,
      shoppingCartList: [],
    };
  }

  componentDidMount() {
    this.getShoppingCart(this.props.user);
  }

  getShoppingCart = (user) => {
    const url = `Cart/GetShoppingCart-${user ? user.Email : null}||${localStorage.getItem(storageShoppingCartKey)}`
    callAPI(url).then(res =>
      this.setState({
        isLoading: false,
        shoppingCartList: res.data
      })
    );    
  }

  handleChange = e => {
    this.setState({ quantity: e.target.value })
  }

  onUpdateQuantity = productVariantId => {
    const { quantity, shoppingCartList } = this.state;
    const { user } = this.props;

    shoppingCartList.find(p => p.productVariant.id === productVariantId).quantity = parseInt(quantity, 10);
    this.setState({
      strShoppingCart: getStrShoppingCart(shoppingCartList)
    }, () => updateShoppingCart(this.state.strShoppingCart, user, this.props.getShoppingCartCount));
  }

  onDeleteProduct = productVariantId => {
    const { shoppingCartList } = this.state;
    const { user } = this.props;    
    const shoppingCartListNew = shoppingCartList.filter(p => p.productVariant.id !== productVariantId);

    this.setState({
      strShoppingCart: getStrShoppingCart(shoppingCartListNew),
      shoppingCartList: shoppingCartListNew
    }, () => updateShoppingCart(this.state.strShoppingCart, user, this.props.getShoppingCartCount))
  }

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
            <label>Số lượng:
              <input
                type="text" name="name"
                value={quantity ? quantity : item.quantity}
                onChange={this.handleChange}
                onBlur={() => this.onUpdateQuantity(item.productVariant.id)}
              />
            </label>
          </div>
          <button onClick={() => this.onDeleteProduct(item.productVariant.id)}>Xóa</button>
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
      <div>
        {this.renderCartItem(shoppingCartList)}
        <br />
        <NavLink to={`/thanh-toan`}>Tới trang thanh toán</NavLink>
      </div>        
    );
  }
}

export default Cart;