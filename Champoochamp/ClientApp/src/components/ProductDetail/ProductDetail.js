import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

import { topProductsName } from '../../shared/constants';
import { callAPI, getIdInMetaTitle } from '../../shared/utils';

import { PageContainer, Section, TopProducts } from '../elements';
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
    if (
      getIdInMetaTitle(nextProps.match.params.product) !== prevState.productId
    ) {
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

  getImageUrls = (selectedColor) => {
    this.setState({
      imageUrls: selectedColor.productImages.imageUrls.split(',')
    });
  };

  componentDidMount() {
    this.getProductById(this.state.productId);
  }

  getProductById = productId => {
    callAPI(`Product/GetProductById-${productId}`).then(res =>
      this.setState({
        isLoading: false,
        isProductChanged: false,
        product: res.data
      })
    );
  };

  render() {
    const { isLoading, product, imageUrls } = this.state;
    const { user, strShoppingCart, updateShoppingCart, onRenderCart } = this.props;

    return isLoading ? (
      <Spin />
    ) : (
        <PageContainer>
          <Section>
            <Row gutter={32}>
              <Col xs={24} md={12} lg={14} xl={16}>
                <ImageThumbnails imageUrls={imageUrls} />
              </Col>
              <Col xs={24} md={12} lg={10} xl={8}>
                <ProductSummary
                  product={product}
                  getImageUrls={this.getImageUrls}
                  user={user}
                  strShoppingCart={strShoppingCart}
                  updateShoppingCart={updateShoppingCart}
                  onRenderCart={onRenderCart}
                />
              </Col>
            </Row>
          </Section>
          <Section>
            <ExtraInfo product={product} />
          </Section>
          <Section>
            <TopProducts product={product} sectionTitle={topProductsName.relatedProducts} />
          </Section>
        </PageContainer>
      );
  }
}

export default ProductDetail;
