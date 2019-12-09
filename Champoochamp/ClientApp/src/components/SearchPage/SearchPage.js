import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';

import { callAPI } from '../../shared/utils';
import { imagesGroup } from '../../shared/constants';
import { typography, breakpoint, colors } from '../../shared/principles';
import {
  ProductCard,
  PageContainer,
  Section,
  SectionTitle,
  Link
} from '../elements';

const ResultText = styled('div')`
  ${typography.boldText};
  border-bottom: solid 1px ${colors.gray};
  margin: 0 10px 10px 10px;
  padding-bottom: 5px;

  ${breakpoint.sm`
    margin: 0 5px 10px 5px;
  `};
`;

const BackButton = styled('div')`
  margin-top: 10px;
`;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: props.match.params.key,
      isSearchKeyChanged: false,
      isLoadMore: true,
      pageSize: 8,
      page: 1,
      totalProducts: 0,
      productList: [],
      showingProductList: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.key !== prevState.searchKey) {
      return {
        searchKey: nextProps.match.params.key,
        isSearchKeyChanged: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { searchKey, isSearchKeyChanged } = this.state;

    if (isSearchKeyChanged) {
      this.getProductList(searchKey);
    }
  }

  componentDidMount() {
    this.getProductList(this.state.searchKey);

    this.scrollListener = window.addEventListener('scroll', e => {
      this.handleScroll(e);
    });
  }

  getProductList = searchKey => {
    callAPI(`Search/GetProductsBySearchKey-${searchKey}`).then(res =>
      this.setState(
        {
          isSearchKeyChanged: false,
          isLoadMore: true,
          page: 1,
          totalProducts: res.data.length,
          productList: res.data
        },
        () => this.getProducts([])
      )
    );
  };

  handleScroll = e => {
    const { isLoadMore, totalProducts, page, pageSize } = this.state;

    if (!isLoadMore) return;
    if (totalProducts <= page * pageSize) return;

    const lastCol = document.querySelector('.ant-col:last-child');
    if (lastCol) {
      const lastColOffset = lastCol.offsetTop + lastCol.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      const bottomOffset = 150;
      if (pageOffset > lastColOffset - bottomOffset) {
        this.loadMore();
      }
    }
  };

  getProducts = showingProductList => {
    const { productList, totalProducts, page, pageSize } = this.state;
    let index = (page - 1) * pageSize;

    if (totalProducts < index + pageSize) {
      this.setState({
        showingProductList: [...showingProductList, ...productList.slice(index)]
      });
    } else if (totalProducts >= index + pageSize) {
      this.setState({
        isLoadMore: true,
        showingProductList: [
          ...showingProductList,
          ...productList.slice(index, index + pageSize)
        ]
      });
    }

    return true;
  };

  loadMore = () => {
    const { showingProductList, page } = this.state;

    this.setState(
      {
        isLoadMore: false,
        page: page + 1
      },
      () => this.getProducts(showingProductList)
    );
  };

  renderProductCard = showingProductList =>
    showingProductList.map(product => {
      return (
        <Col xs={12} sm={8} md={6} xl={4} key={product.id}>
          <ProductCard imageGroup={imagesGroup.products} product={product} />
        </Col>
      );
    });

  render() {
    const { totalProducts, showingProductList } = this.state;

    return (
      <PageContainer>
        <Section>
          <SectionTitle content="Kết quả tìm kiếm" />
          {totalProducts ? (
            <Fragment>
              <ResultText>{totalProducts} sản phẩm</ResultText>
              <Row>{this.renderProductCard(showingProductList)}</Row>
            </Fragment>
          ) : (
            <Fragment>
              <span>Không tìm thấy sản phẩm nào.</span>
              <NavLink to="/">
                <BackButton>
                  <Link content="Về trang chủ" iconType="fas fa-chevron-left" />
                </BackButton>
              </NavLink>
            </Fragment>
          )}
        </Section>
      </PageContainer>
    );
  }
}

export default SearchPage;
