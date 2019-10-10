import React, { Component } from "react";
import { TOP_PRODUCTS } from "../../shared/constants";

import Banner from "./components/Banner";
import TopProducts from "./components/TopProducts";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Banner></Banner>
        <TopProducts
          sectionTitle={TOP_PRODUCTS.DISCOUNT_PRODUCTS}
        ></TopProducts>
        <TopProducts sectionTitle={TOP_PRODUCTS.NEW_PRODUCTS}></TopProducts>
      </div>
    );
  }
}

export default Homepage;
