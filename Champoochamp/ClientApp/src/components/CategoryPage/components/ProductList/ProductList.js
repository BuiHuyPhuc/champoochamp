import React, { Component } from "react";
import { Row, Col } from "antd";

import FilterPanel from "./components/FilterPanel";
import ProductGrid from "./components/ProductGrid";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.categoryId
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoryId !== prevState.categoryId) {
      return {
        categoryId: nextProps.categoryId
      };
    }

    return null;
  }

  render() {
    return (
      <div className="container">
        <Row className="product-list-wrapper">
          <Col xs={24} lg={6}>
            <FilterPanel></FilterPanel>
          </Col>
          <Col xs={24} lg={18}>
            <ProductGrid categoryId={this.state.categoryId}></ProductGrid>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;
