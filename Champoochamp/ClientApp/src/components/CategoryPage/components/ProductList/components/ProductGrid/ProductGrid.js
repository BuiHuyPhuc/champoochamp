import React, { Component } from "react";
import { Row, Col } from "antd";

import ProductCard from "../../../../../ProductCard";

class ProductGrid extends Component {
  render() {
    return (
      <div className="product-grid">
        <Row>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwbb1d63f5/product_images/0131242100133NEW_01_326.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw66726ef1/product_images/0132436750172NEW_01_569.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwbef48e9c/product_images/0132454210207NEW_01_510.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw36f2cc14/product_images/0132436750173NEW_01_025.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw8d91954a/product_images/0132436750170NEW_01_041.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
          <Col xs={12} lg={8}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw644609c2/product_images/0131242100143NEW_01_510.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductGrid;
