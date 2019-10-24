import React, { Component } from "react";
import { Row, Col, Spin } from "antd";

import CallAPI from "../../shared/utils/CallAPI";
import getIdInMetaTitle from "../../shared/utils/getIdInMetaTitle";
import groupBy from "../ProductDetail/groupBy"; 

import Container from "../elements/Container";
import Section from "../elements/Section";
import ImageThumbnails from "./components/ImageThumbnails";
import ProductSummary from "./components/ProductSummary";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: getIdInMetaTitle(props.match.params.product),
      isLoading: true,
      product: null,
      sizes: [],
      colors: [],
    };
  }

  componentDidMount() {
    this.getProductById(this.state.productId);
  }

  getProductById = productId => {
    CallAPI(`Product/GetProductById-${productId}`).then(res => this.setState({
      isLoading: false,
      product: res.data,
      sizes: groupBy(res.data.productVariant, p => p.sizeId).map(item => item.size),
      colors: groupBy(res.data.productVariant, p => p.colorId)
    }));
  }

  render() {
    const { isLoading, product, sizes, colors } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
        <Container>
          <Section isFirstSection>
            <Row gutter={32}>
              <Col xs={24} md={14} lg={16}>
                <ImageThumbnails colors={colors}></ImageThumbnails>
              </Col>
              <Col xs={24} md={10} lg={8}>
                <ProductSummary product={product} sizes={sizes} colors={colors}></ProductSummary>
              </Col>
            </Row>
          </Section>
        </Container>
      );
  }
}

export default ProductDetail;
