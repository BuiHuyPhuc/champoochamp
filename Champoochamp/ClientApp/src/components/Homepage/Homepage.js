import React, { Component } from "react";
import { TOP_PRODUCTS } from "../../shared/constants"

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
            <TopProducts sectionTitle={TOP_PRODUCTS.DISCOUNT_PRODUCTS}></TopProducts>
            <TopProducts sectionTitle={TOP_PRODUCTS.NEW_PRODUCTS}></TopProducts>
      </div>
    );
  }
}

export default Homepage;
