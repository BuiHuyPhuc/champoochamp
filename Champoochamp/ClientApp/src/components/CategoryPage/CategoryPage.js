import React, { Component } from "react";

import Header from "../Header";
import Breadcrumb from './components/Breadcrumb';
import ProductList from './components/ProductList';

class CategoryPage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Breadcrumb></Breadcrumb>
        <ProductList></ProductList>
      </div>
    );
  }
}

export default CategoryPage;
