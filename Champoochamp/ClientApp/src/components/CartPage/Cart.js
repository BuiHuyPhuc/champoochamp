import React, { Component } from "react";
import { Spin } from 'antd';

import { callAPI, getStrShoppingCart, getShoppingCartCount } from '../../shared/utils';

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
    this.getShoppingCart(this.props.userEmail);
  }

  getShoppingCart = (userEmail) => {
    if (userEmail) {
      const url = `Cart/GetShoppingCart-${userEmail}`
      callAPI(url).then(res =>
        this.setState({
          isLoading: false,
          shoppingCartList: res.data
        })
      );
    }
    else {

    }
    
  }

  updateShoppingCart = userEmail => {    
    const { strShoppingCart, shoppingCartList } = this.state;
    const { getShoppingCartCount } = this.props;
    
    if (userEmail) {
      const url = `Cart/UpdateShoppingCart-${strShoppingCart}-${userEmail}`
      callAPI(url).then(res => getShoppingCartCount(shoppingCartList.length));
    }    
  }

  handleChange = e => {
    this.setState({ quantity: e.target.value })
  }

  onUpdateQuantity = productVariantId => {
    const { shoppingCartList, quantity } = this.state;
    const { userEmail } = this.props;

    shoppingCartList.find(p => p.productVariant.id === productVariantId).quantity = parseInt(quantity, 10);
    this.setState({
      strShoppingCart: getStrShoppingCart(shoppingCartList)
    }, () => this.updateShoppingCart(userEmail));
  }

  onDeleteProduct = productVariantId => {
    const { shoppingCartList } = this.state;
    const { userEmail } = this.props;    
    const shoppingCartListNew = shoppingCartList.filter(p => p.productVariant.id !== productVariantId);

    this.setState({
      strShoppingCart: getStrShoppingCart(shoppingCartListNew),
      shoppingCartList: shoppingCartListNew
    }, () => this.updateShoppingCart(userEmail))
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
        </div>
      );
  }
}

export default Cart;