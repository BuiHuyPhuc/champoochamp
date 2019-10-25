import React, { Component } from "react";
import { topProducts } from "../../shared/constants";

import Banner from "./components/Banner";
import TopProducts from "./components/TopProducts";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Banner></Banner>
        <TopProducts
          sectionTitle={topProducts.discountProducts}
        ></TopProducts>
        <TopProducts sectionTitle={topProducts.newProducts}></TopProducts>
      </div>
    );
  }
}

export default Homepage;
