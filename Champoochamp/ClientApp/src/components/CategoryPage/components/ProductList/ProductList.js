import React, { Component } from "react";
import { Row, Col } from "antd";

import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';

class ProductList extends Component {
  render() {
    return (
      <div className="container">
        <Row className="product-list-wrapper">
          <Col xs={24} lg={6}>
            <FilterPanel></FilterPanel>
          </Col>
          <Col xs={24} lg={18}>
            <ProductGrid></ProductGrid>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;
