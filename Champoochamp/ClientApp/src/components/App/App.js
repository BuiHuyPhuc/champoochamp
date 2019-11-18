import React, { Component } from "react";
import { Router } from 'react-router-dom';
import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";
import history from "../App/history";

import { callAPI, getCartTotalQuantity } from '../../shared/utils';
import { storageShoppingCartKey } from '../../shared/constants';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: {
      //   Email: 'buihuyphuc97@gmail.com',
      //   FirstName: 'Bùi Huy',
      //   LastName: 'Phúc',
      //   Telephone: '0914659369',
      //   CreatedDate: '2019-11-08'
      // },
      user: null,
      shoppingCartCount: 0
    };
  }

  componentDidMount() {
    const { user } = this.state;

    if (user) {
      const url = `User/GetUserByEmail-${user.Email}`;
      callAPI(url).then(res =>
        this.setState({
          shoppingCartCount: getCartTotalQuantity(res.data.shoppingCarts)
        })
      );
    }
    else {
      this.setState({
        shoppingCartCount: getCartTotalQuantity(localStorage.getItem(storageShoppingCartKey))
      })
    }   
  }

  updateCartTotalQuantity = shoppingCartCount => {
    this.setState({
      shoppingCartCount
    });
  }

  render() {
    const { user, shoppingCartCount } = this.state;

    return (
      <Router history={history}>
        <Header user={user} shoppingCartCount={shoppingCartCount} />
        <RouterConfig user={user} updateCartTotalQuantity={this.updateCartTotalQuantity}></RouterConfig>
      </Router>
    );
  }
}

export default App;