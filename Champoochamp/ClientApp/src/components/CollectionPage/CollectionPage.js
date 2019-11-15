import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

import { callAPI, getIdInMetaTitle, getImageUrl } from '../../shared/utils';
import { imagesGroup } from '../../shared/constants';
import { ProductCard, PageContainer, Section, Image } from '../elements';

class CollectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionId: getIdInMetaTitle(props.match.params.collection),
      isCollectionIdChanged: false,
      isLoading: true,
      collection: null,
      productList: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (getIdInMetaTitle(nextProps.match.params.collection) !== prevState.collectionId) {
      return {
        collectionId: getIdInMetaTitle(nextProps.match.params.collection),
        isCollectionIdChanged: true,
        isLoading: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { collectionId, isCollectionIdChanged } = this.state;
    
    if (isCollectionIdChanged) {
      this.getProductList(collectionId);
    }
  }

  componentDidMount() {
    this.getProductList(this.state.collectionId);
  }

  getProductList = collectionId => {
    callAPI(`Product/GetProductsByCollectionId-${collectionId}`).then(res =>
      this.setState({
        isCollectionIdChanged: false,
        isLoading: false,
        collection: res.data[0].collection,
        productList: res.data
      })
    );
  };

  renderProductCard = productList =>
    productList.map(product => {
      return (
        <Col xs={12} sm={8} md={6} xl={4} key={product.id}>
          <ProductCard imageGroup={imagesGroup.products} product={product} />
        </Col>
      );
    });

  render() {
    const { isLoading, collection, productList } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
        <PageContainer>
          <Image imageUrl={getImageUrl(collection.thumbnail, imagesGroup.collections)} alt=""/>
          <Section>
            <Row>{this.renderProductCard(productList)}</Row>
          </Section>
        </PageContainer>
      );
  }
}

export default CollectionPage;
