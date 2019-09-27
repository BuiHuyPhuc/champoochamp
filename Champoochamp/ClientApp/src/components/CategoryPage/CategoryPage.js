import React, { Component } from "react";

import Header from "../Header";
import Breadcrumb from "./components/Breadcrumb";
import ProductList from "./components/ProductList";
import DropDown from "../DropDown";

class CategoryPage extends Component {
  constructor() {
    super();
    this.state = {
      location: [
        {
          id: 0,
          title: "New York",
          selected: false,
          key: "location"
        },
        {
          id: 1,
          title: "Dublin",
          selected: false,
          key: "location"
        },
        {
          id: 2,
          title: "California",
          selected: false,
          key: "location"
        },
        {
          id: 3,
          title: "Istanbul",
          selected: false,
          key: "location"
        },
        {
          id: 4,
          title: "Izmir",
          selected: false,
          key: "location"
        },
        {
          id: 5,
          title: "Oslo",
          selected: false,
          key: "location"
        }
      ]
    };
  }

  toggleSelected = (id, key) => {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
  }

  render() {
    const { location } = this.state;

    return (
      <div>
        <Header></Header>
        <Breadcrumb></Breadcrumb>
        <DropDown
          title="Demo Dropdown"
          list={location}
          toggleItem={this.toggleSelected}
        ></DropDown>
        <ProductList></ProductList>
      </div>
    );
  }
}

export default CategoryPage;
