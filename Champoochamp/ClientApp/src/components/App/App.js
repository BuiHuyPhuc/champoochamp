import React, { Component } from "react";
import { Router } from 'react-router-dom';
import history from "../App/history";

import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";

import { callAPI, getCookie } from '../../shared/utils';
import { storageShoppingCartKey, emailKey, passwordKey } from '../../shared/constants';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRenderMenu: true,
      user: null,
      strShoppingCart: null
    };
  }

  componentDidMount() {
    this.getShoppingCartByUser(this.state.user);
    this.checkLoginUserByCookie();    
  }

  checkLoginUserByCookie = () => {
    const data = {
      email: getCookie(emailKey),
      password: getCookie(passwordKey)
    }
    callAPI('User/CheckLogin', '', 'POST', data).then(res => {
      if (res.data) {        
        //setCookie(emailKey, values.email, 1);
        //setCookie(passwordKey, values.password, 1);
        this.getLoginUser(res.data);
      }
    });
  }

  getShoppingCartByUser = user => {
    if (user) {
      const url = `User/GetUserByEmail-${user.email}`;
      callAPI(url).then(res => this.setState({ strShoppingCart: res.data.shoppingCarts }));
    }
    else if (localStorage.getItem(storageShoppingCartKey)) {
      this.setState({ strShoppingCart: localStorage.getItem(storageShoppingCartKey) })
    }
  }

  getLoginUser = user => {
    this.setState({
      user
    }, () => this.getShoppingCartByUser(this.state.user));
  }

  updateShoppingCart = strShoppingCart => {    
    this.setState({ strShoppingCart });
  }

  onRenderMenu = isRenderMenu => {
    if (isRenderMenu !== this.state.isRenderMenu) {
      this.setState({ isRenderMenu });
    }
  }

  render() {
    const { isRenderMenu, user, strShoppingCart } = this.state;

    return (
      <Router history={history}>
        {isRenderMenu && <Header user={user} getLoginUser={this.getLoginUser} strShoppingCart={strShoppingCart} updateShoppingCart={this.updateShoppingCart} />}
        <RouterConfig
          user={user}
          getLoginUser={this.getLoginUser}
          strShoppingCart={strShoppingCart}
          updateShoppingCart={this.updateShoppingCart}
          onRenderMenu={this.onRenderMenu}
        />
      </Router>
    );
  }
}

export default App;