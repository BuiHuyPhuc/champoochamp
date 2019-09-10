import React, { Component } from "react";

import Header from "../Header";
import Banner from "./components/Banner";
import HottestProducts from './components/HottestProducts';
import Collection from './components/Collection';

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Banner></Banner>
        <Collection></Collection>
        <HottestProducts></HottestProducts>
        <HottestProducts></HottestProducts>
      </div>
    );
  }
}

export default Homepage;
