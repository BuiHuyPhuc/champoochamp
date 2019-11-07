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
      shoppingCartCount: 0
    };
  }

  getShoppingCartCount = shoppingCartCount => {
    this.setState({ shoppingCartCount });
    console.log("App.js: " + shoppingCartCount)
  }

  render() {
    return (
      <Router history={history}>
        <Header shoppingCartCount={this.state.shoppingCartCount} />
        <RouterConfig getShoppingCartCount={this.getShoppingCartCount}></RouterConfig>
      </Router>
    );
  }
}

export default App;