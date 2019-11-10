import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

import { topProductsName } from '../../shared/constants';
import { callAPI, getIdInMetaTitle } from '../../shared/utils';
import groupBy from './groupBy';

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
      product: null,
      sizes: [],
      colors: []
    };
  }

  componentDidMount() {
    this.getProductById(this.state.productId);
  }

  getProductById = productId => {
    callAPI(`Product/GetProductById-${productId}`).then(res =>
      this.setState({
        isLoading: false,
        product: res.data,
        sizes: groupBy(res.data.productVariant, p => p.sizeId).map(
          item => item.size
        ),
        colors: groupBy(res.data.productVariant, p => p.colorId)
      })
    );
  };

  render() {
    const { isLoading, product, sizes, colors } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
      <PageContainer>
        <Section>
          <Row gutter={32}>
            <Col xs={24} md={12} lg={14} xl={16}>
              <ImageThumbnails colors={colors}></ImageThumbnails>
            </Col>
            <Col xs={24} md={12} lg={10} xl={8}>
              <ProductSummary
                product={product}
                sizes={sizes}
                colors={colors}
              ></ProductSummary>
            </Col>
          </Row>
        </Section>
        <Section>
          <ExtraInfo />
        </Section>
        <Section>
          <TopProducts sectionTitle={topProductsName.discountProducts} />
        </Section>
      </PageContainer>
    );
  }
}

export default ProductDetail;
