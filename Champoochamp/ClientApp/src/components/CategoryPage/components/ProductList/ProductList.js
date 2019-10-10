import React, { Component } from "react";
import { Row, Col } from "antd";

import { FILTER_GROUP } from "../../../../shared/constants";
import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.categoryId,
      currentFilterList: [
        { name: FILTER_GROUP.SIZE, data: [] },
        { name: FILTER_GROUP.COLOR, data: [] },
        { name: FILTER_GROUP.BRAND, data: [] }
      ],
      currentMoneyFilter: { id: 0 }
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

  getCurrentFilterList = (currentFilterList, currentMoneyFilter) => {
    this.setState({
      currentFilterList,
      currentMoneyFilter
    });
  }

  render() {
    const { categoryId, currentFilterList, currentMoneyFilter } = this.state;

    return (
      <div className="container">
        <Row className="product-list-wrapper">
          <Col xs={24} lg={6}>
            <FilterPanel
              categoryId={categoryId}
              getCurrentFilterList={this.getCurrentFilterList}
            />
          </Col>
          <Col xs={24} lg={18}>
            <ProductGrid
              categoryId={categoryId}
              currentFilterList={currentFilterList}
              currentMoneyFilter={currentMoneyFilter}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;
