import React, { Component } from "react";
import { Router } from 'react-router-dom';
import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";
import history from "../App/history";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartAllItem: 0
    };
  }

  getCartAllItem = (cartAllItem) => {
    console.log("App.js: " + cartAllItem)
  }

  render() {
    return (
      <Router history={history}>
        <Header cartAllItem={this.state.cartAllItem} />
        <RouterConfig getCartAllItem={this.getCartAllItem}></RouterConfig>
      </Router>
    );
  }
}

export default App;