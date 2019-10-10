import React, { Component } from "react";
import { Row, Col } from "antd";

import Container from "../elements/Container";
import Section from "../elements/Section";
import ImageThumbnails from "./components/ImageThumbnails";
import ProductSummary from "./components/ProductSummary";

class ProductDetail extends Component {
  render() {
    return (
      <Container>
        <Section isFirstSection>
          <Row gutter={32}>
            <Col xs={24} md={14} lg={16}>
              <ImageThumbnails></ImageThumbnails>
            </Col>
            <Col xs={24} md={10} lg={8}>
              <ProductSummary></ProductSummary>
            </Col>
          </Row>
        </Section>
      </Container>
    );
  }
}

export default ProductDetail;
