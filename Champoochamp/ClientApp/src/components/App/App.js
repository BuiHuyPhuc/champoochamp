import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "../Header";
import RouterConfig from "../../router/RouterConfig";
import history from "../App/history";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <RouterConfig></RouterConfig>
      </Router>
    );
  }
}

export default App;