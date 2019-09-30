import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Spin } from "antd";
import { API_PORT, IMAGE_GROUP } from "../../../../../../shared/constants";

import ProductCard from "../../../../../ProductCard";

class ProductGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.categoryId,
            isCategoryChanged: false,
            isLoading: true,
            isLoadMore: true,
            pageSize: 6,
            page: 1,
            totalProducts: 0,
            productList: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.categoryId !== prevState.categoryId) {
            return {
                categoryId: nextProps.categoryId,
                isCategoryChanged: true
            };
        }

        return null;
    }

    componentDidUpdate() {
        const { isCategoryChanged, categoryId } = this.state;

        if (isCategoryChanged) {
            this.getTotalProducts(categoryId);
            this.initProductList(categoryId);
        }
    }

    componentDidMount() {
        const { categoryId } = this.state;

        this.getTotalProducts(categoryId);
        this.initProductList(categoryId);
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e);          
        });
    }

    getTotalProducts = categoryId => {
        axios.get(`${API_PORT}/api/Product/GetProductsByCategoryId-${categoryId}`)
            .then(response => response.data)
            .then(data => this.setState({
                totalProducts: data.length,
            }))
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByCategoryId: ` + error));
    }

    initProductList = categoryId => {
        const { pageSize } = this.state;

        axios.get(`${API_PORT}/api/Product/GetProductsByCategoryId-${categoryId}`, {
            params: {
                $top: `${pageSize}`
            }
        })
            .then(response => response.data)
            .then(data => {
                this.setState({
                    isCategoryChanged: false,
                    isLoading: false,
                    isLoadMore: true,
                    page: 1,
                    productList: data
                })
            })
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByCategoryId: ` + error));
    }

    getMoreProducts = categoryId => {
        const { page, pageSize, productList } = this.state;

        axios.get(`${API_PORT}/api/Product/GetProductsByCategoryId-${categoryId}`, {
            params: {
                $skip: `${(page - 1) * pageSize}`,
                $top: `${pageSize}`
            }
        })
            .then(response => response.data)
            .then(data => this.setState({
                isLoading: false,
                isLoadMore: true,
                productList: [...productList, ...data]
            }))
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByCategoryId: ` + error));
    }

    handleScroll = e => {
        const { isLoadMore, totalProducts, page, pageSize } = this.state;

        if (!isLoadMore) return;
        if (totalProducts <= (page * pageSize)) return;

        const lastCol = document.querySelector("div.product-grid .ant-col:last-child");
        if (lastCol) {
            const lastColOffset = lastCol.offsetTop + lastCol.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            const bottomOffset = 100;
            if (pageOffset > lastColOffset + bottomOffset) {
                this.loadMore();
            }
        }
    }

    loadMore = () => {
        const { page, categoryId } = this.state;

        this.setState({
            isLoadMore: false,
            page: page + 1
        }, () => this.getMoreProducts(categoryId))
    }

    render() {
        const { isLoading, totalProducts, productList } = this.state

        if (isLoading) {
            return (
                <div className="product-grid"><Spin /></div>
            );
        }

        return (
            <div className="product-grid">
                <p>Tổng sản phẩm: {totalProducts}</p>
                <Row>
                    {productList.map(product => {
                        return (
                            <Col xs={12} lg={8} key={product.id}>
                                <ProductCard
                                    key={product.id}
                                    imageGroup={IMAGE_GROUP.PRODUCTS}
                                    imageName={product.productVariant[0].thumbnail}
                                    name={product.name}
                                    price={product.promotionPrice}>
                                </ProductCard>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export default ProductGrid;
