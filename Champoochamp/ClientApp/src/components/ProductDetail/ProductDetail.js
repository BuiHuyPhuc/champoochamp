import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

import { topProductsName } from '../../shared/constants';
import { callAPI, getIdInMetaTitle } from '../../shared/utils';

import { Container, Section, TopProducts } from '../elements';
import ImageThumbnails from './components/ImageThumbnails';
import ProductSummary from './components/ProductSummary';
import ExtraInfo from './components/ExtraInfo';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: getIdInMetaTitle(props.match.params.product),
      isLoading: true,
      isProductChanged: false,
      product: null,
      imageUrls: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (getIdInMetaTitle(nextProps.match.params.product) !== prevState.productId) {
      return {
        productId: getIdInMetaTitle(nextProps.match.params.product),
        isLoading: true,
        isProductChanged: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { isProductChanged, productId } = this.state;

    if (isProductChanged) {
      this.getProductById(productId);
    }
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
      isProductChanged: false,
      product: res.data
    }));
  }

  render() {
    const { isLoading, product, imageUrls } = this.state;
    const { getCartAllItem } = this.props;

    return isLoading ? (
      <Spin />
    ) : (
        <Container>
          <Section>
            <Row gutter={32}>
              <Col xs={24} md={14} lg={16}>
                <ImageThumbnails imageUrls={imageUrls}></ImageThumbnails>
              </Col>
              <Col xs={24} md={10} lg={8}>
                <ProductSummary product={product} getImageUrls={this.getImageUrls} getCartAllItem={getCartAllItem} />
              </Col>
            </Row>
          </Section>
          <Section>
            <ExtraInfo />
          </Section>
          <Section>
            <TopProducts sectionTitle={topProductsName.discountProducts} />
          </Section>
        </Container>
      );
  }
}

export default ProductDetail;
