import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Homepage from "../components/Homepage";
import CategoryPage from "../components/CategoryPage";
import SearchPage from "../components/SearchPage";
import ProductDetail from "../components/ProductDetail";

class RouterConfig extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/san-pham/:lv1?/:lv2?/:lv3?" component={CategoryPage} />
        <Route path="/tim-kiem/:key?" component={SearchPage} />
        <Route path="/chi-tiet" component={ProductDetail} />
        <Route component={Homepage} />
      </Switch>
    );
  }
}

export default RouterConfig;