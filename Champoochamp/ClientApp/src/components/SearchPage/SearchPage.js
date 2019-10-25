import React, { Component } from "react";
import { Row, Col, Spin } from "antd";

import { callAPI } from "../../shared/utils";
import { imagesGroup } from "../../shared/constants";
import ProductCard from "../elements/ProductCard";
import Container from "../elements/Container";
import Section from "../elements/Section";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: props.match.params.key,
      isSearchKeyChanged: false,
      isLoading: true,
      isLoadMore: true,
      pageSize: 8,
      page: 1,
      totalProducts: 0,
      productList: [],
      showingProductList: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.key !== prevState.searchKey) {
      return {
        searchKey: nextProps.match.params.key,
        isSearchKeyChanged: true,
        isLoading: true
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

    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  getProductList = searchKey => {
    callAPI(`Search/GetProductsBySearchKey-${searchKey}`)
      .then(res => this.setState({
        isSearchKeyChanged: false,
        isLoading: false,
        isLoadMore: true,
        page: 1,
        totalProducts: res.data.length,
        productList: res.data,
      }, () => this.getProducts([])));
  }

  handleScroll = e => {
    const { isLoadMore, totalProducts, page, pageSize } = this.state;

    if (!isLoadMore) return;
    if (totalProducts <= page * pageSize) return;

    const lastCol = document.querySelector(".ant-col:last-child");
    if (lastCol) {
      const lastColOffset = lastCol.offsetTop + lastCol.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      const bottomOffset = 150;
      if (pageOffset > lastColOffset - bottomOffset) {
        this.loadMore();
      }
    }
  }

  getProducts = showingProductList => {
    const { productList, totalProducts, page, pageSize } = this.state;
    let index = (page - 1) * pageSize;

    if (totalProducts < index + pageSize) {
      this.setState({
        showingProductList: [...showingProductList, ...productList.slice(index)]
      });
    }
    else if (totalProducts >= index + pageSize) {
      this.setState({
        isLoadMore: true,
        showingProductList: [...showingProductList, ...productList.slice(index, index + pageSize)]
      });
    }

    return true;
  }

  loadMore = () => {    
    const { showingProductList, page } = this.state;

    this.setState({
      isLoadMore: false,
      page: page + 1
    }, () => this.getProducts(showingProductList))
  }

  renderProductCard = showingProductList => showingProductList.map(product => {
    return (
      <Col xs={12} lg={6} key={product.id}>
        <ProductCard
          imageGroup={imagesGroup.products}
          product={product}
        />
      </Col>
    );
  })

  render() {
    const { isLoading, totalProducts, showingProductList } = this.state;
    
    return (
      isLoading ? <Spin /> : (
        <Container>
          <Section isFirstSection>
            <h3>{totalProducts} sản phẩm</h3>
            <Row>
              {this.renderProductCard(showingProductList)}
            </Row>
          </Section>
          
        </Container>
      )
    );
  }
}

export default SearchPage;
