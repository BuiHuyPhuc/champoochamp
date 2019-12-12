import React, { Component } from "react";
import { Router } from 'react-router-dom';
import history from "../App/history";

import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";

import { callAPI, setCookie, getCookie } from '../../shared/utils';
import { localStorageKey } from '../../shared/constants';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartDrawerVisible: false,
      isRenderMenu: true,
      user: null,
      strShoppingCart: null
    };
  }

  componentDidMount() {
    this.checkLoginUserByCookie()
    .then(res => !res && this.getStrShoppingCartByUser(this.state.user))
  }

  checkLoginUserByCookie = () => {
    return new Promise((resolve, reject) => {
      const data = {
        email: getCookie(localStorageKey.emailKey),
        password: getCookie(localStorageKey.passwordKey)
      };
      callAPI('User/CheckLogin', '', 'POST', data).then(res => {
        if (res.data) {
          setCookie(localStorageKey.emailKey, data.email, 1);
          setCookie(localStorageKey.passwordKey, data.password, 1);
          this.getLoginUser(res.data);
          return resolve(true);
        }
        else {
          return resolve(false);
        }
      });
    });    
  }

  getStrShoppingCartByUser = user => {
    const url = 'Cart/GetStrShoppingCart';
    const data = {
      email: user && user.email,
      shoppingCarts: `${localStorage.getItem(localStorageKey.storageShoppingCartKey)}`
    };

    callAPI(url, '', 'POST', data).then(res => this.setState({
      strShoppingCart: res.data
    }));
  }

  getLoginUser = user => {
    this.setState({
      user
    }, () => this.getStrShoppingCartByUser(this.state.user));
  }

  updateShoppingCart = strShoppingCart => {
    this.setState({ strShoppingCart });
  }

  onRenderCart = isCartDrawerVisible => {
    this.setState({ isCartDrawerVisible });
  }

  onRenderMenu = isRenderMenu => {
    if (isRenderMenu !== this.state.isRenderMenu) {
      this.setState({ isRenderMenu });
    }
  }

  render() {
    const { isCartDrawerVisible, isRenderMenu, user, strShoppingCart } = this.state;

    return (
      <Router history={history}>
        {
          isRenderMenu &&
          <Header
            user={user}
            getLoginUser={this.getLoginUser}
            strShoppingCart={strShoppingCart}
            updateShoppingCart={this.updateShoppingCart}
            onRenderCart={this.onRenderCart}
            isCartDrawerVisible={isCartDrawerVisible}
          />
        }
        <RouterConfig
          user={user}
          getLoginUser={this.getLoginUser}
          strShoppingCart={strShoppingCart}
          updateShoppingCart={this.updateShoppingCart}
          onRenderMenu={this.onRenderMenu}
          onRenderCart={this.onRenderCart}
        />
      </Router>
    );
  }
}

export default App;