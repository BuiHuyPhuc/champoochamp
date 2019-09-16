import React, { Component } from "react";

import Header from "../Header";
import Banner from "./components/Banner";
import TopProducts from './components/TopProducts';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Banner></Banner>
        <TopProducts sectionTitle="Best sellers"></TopProducts>
        <TopProducts sectionTitle="Sản phẩm mới"></TopProducts>
      </div>
    );
  }
}

export default Homepage;
