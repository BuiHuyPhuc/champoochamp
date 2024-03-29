﻿import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import styled from '@emotion/styled';

import { breakpoint, colors, typography } from '../../../../../../shared/principles';
import { sortsGroup, imagesGroup } from '../../../../../../shared/constants';
import {
  callAPI,
  getQueryFilter,
  getTotalFilter
} from '../../../../../../shared/utils';
import { ProductCard, DropDown } from '../../../../../elements';

const Wrapper = styled('div')`
  padding-left: 20px;

  ${breakpoint.lg`
    padding-left: 0;
  `};
`;

const Header = styled('div')`
  align-items: center;
  border-bottom: solid 1px ${colors.gray};
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
  padding-bottom: 5px;

  ${breakpoint.sm`
    margin: 0 5px 10px 5px;
  `};
`;

const TotalProducts = styled('span')`
  ${typography.boldText};
`;

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.categoryId,
      currentFilterList: props.currentFilterList,
      currentFilterNumber: 0,
      currentMoneyFilter: props.currentMoneyFilter,
      currentSortOption: sortsGroup[0],
      isCategoryChanged: false,
      isFilterChanged: false,
      isLoading: true,
      isLoadMore: true,
      pageSize: 6,
      page: 1,
      totalProducts: 0,
      productList: [],
      showingProductList: [],
      sortItems: sortsGroup
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoryId !== prevState.categoryId) {
      return {
        categoryId: nextProps.categoryId,
        isCategoryChanged: true,
        isLoading: true
      };
    } else if (
      getTotalFilter(nextProps.currentFilterList) !==
        prevState.currentFilterNumber ||
      nextProps.currentMoneyFilter.id !== prevState.currentMoneyFilter.id
    ) {
      return {
        currentFilterList: nextProps.currentFilterList,
        currentFilterNumber: getTotalFilter(nextProps.currentFilterList),
        currentMoneyFilter: nextProps.currentMoneyFilter,
        isFilterChanged: true,
        isLoading: true
      };
    }

    return null;
  }

  componentDidUpdate() {
    const {
      isCategoryChanged,
      isFilterChanged,
      categoryId,
      currentFilterList,
      currentMoneyFilter,
      currentSortOption
    } = this.state;

    if (isCategoryChanged || isFilterChanged) {
      this.getProductList(
        categoryId,
        currentFilterList,
        currentMoneyFilter,
        currentSortOption
      );
    }
  }

  componentDidMount() {
    const {
      categoryId,
      currentFilterList,
      currentMoneyFilter,
      currentSortOption
    } = this.state;

    this.getProductList(
      categoryId,
      currentFilterList,
      currentMoneyFilter,
      currentSortOption
    );

    this.scrollListener = window.addEventListener('scroll', e => {
      this.handleScroll(e);
    });
  }

  getProductList = (
    categoryId,
    currentFilterList,
    currentMoneyFilter,
    currentSortOption
  ) => {
    const url = `Product/GetProductsByCategoryId-${categoryId}`;
    const query = getQueryFilter(
      currentFilterList,
      currentMoneyFilter,
      currentSortOption
    );

    callAPI(url, query).then(res =>
      this.setState(
        {
          isCategoryChanged: false,
          isFilterChanged: false,
          isLoading: false,
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
      const bottomOffset = 100;
      if (pageOffset > lastColOffset + bottomOffset) {
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
        <Col xs={12} sm={8} md={6} lg={8} xl={6} key={product.id}>
          <ProductCard imageGroup={imagesGroup.products} product={product} />
        </Col>
      );
    });

  callback = selectedOption => {
    this.setState({ currentSortOption: selectedOption }, () => {
      const {
        categoryId,
        currentFilterList,
        currentMoneyFilter,
        currentSortOption
      } = this.state;
      this.getProductList(
        categoryId,
        currentFilterList,
        currentMoneyFilter,
        currentSortOption
      );
    });
  };

  render() {
    const {
      isLoading,
      totalProducts,
      showingProductList,
      sortItems,
      currentSortOption
    } = this.state;

    return isLoading ? (
      <Spin />
    ) : (
      <Wrapper>
        <Header>
          <TotalProducts>{totalProducts} sản phẩm</TotalProducts>
          <DropDown
            title="Sắp xếp"
            optionList={sortItems}
            callback={this.callback}
            prevSelectedOption={currentSortOption}
          ></DropDown>
        </Header>
        <Row>{this.renderProductCard(showingProductList)}</Row>
      </Wrapper>
    );
  }
}

export default ProductGrid;
