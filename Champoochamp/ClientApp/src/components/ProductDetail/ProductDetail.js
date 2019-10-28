import React, { Component } from "react";
import { Row, Col, Spin } from "antd";

import { callAPI, getIdInMetaTitle } from "../../shared/utils";
import { Container, Section } from "../elements";
import ImageThumbnails from "./components/ImageThumbnails";
import ProductSummary from "./components/ProductSummary";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: getIdInMetaTitle(props.match.params.product),
      isLoading: true,
      product: null,
      imageUrls: []
    };
  }

  getImageUrls = selectedColor => {
    this.setState({ imageUrls: selectedColor.productImages.imageUrls.split(',') });
  }

  componentDidMount() {
    this.getProductById(this.state.productId);
  }

  getProductById = productId => {
    callAPI(`Product/GetProductById-${productId}`).then(res => this.setState({
      isLoading: false,
      product: res.data
    }));
  }

  render() {
    const { isLoading, product, imageUrls } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
        <Container>
          <Section isFirstSection>
            <Row gutter={32}>
              <Col xs={24} md={14} lg={16}>
                <ImageThumbnails imageUrls={imageUrls}></ImageThumbnails>
              </Col>
              <Col xs={24} md={10} lg={8}>
                <ProductSummary product={product} getImageUrls={this.getImageUrls} />
              </Col>
            </Row>
          </Section>
        </Container>
      );
  }
}

export default ProductDetail;
