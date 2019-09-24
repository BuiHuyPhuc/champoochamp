import React, { Component } from "react";
import { Row, Col } from "antd";

import ProductCard from "../../../../../ProductCard";

class ProductGrid extends Component {
    render() {
        return (
            <div className="product-grid">
                <Row>
                    <Col xs={12} lg={8}>
                        abc
                    </Col>
                </Row>
            </div>
            //<div className="product-grid">
            //  <Row>
            //    <Col xs={12} lg={8}>
            //      <ProductCard
            //        imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwbb1d63f5/product_images/0131242100133NEW_01_326.jpg?sw=458&sh=710&sm=fit"
            //        name="Casual T-shirt for summer"
            //        price="1.500.000"
            //      ></ProductCard>
            //    </Col>
            //  </Row>
            //</div>
        );
    }
}

export default ProductGrid;
