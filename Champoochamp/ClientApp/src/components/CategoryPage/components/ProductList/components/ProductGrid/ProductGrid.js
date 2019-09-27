import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Spin } from "antd";
import { API_PORT, IMAGE_GROUP } from "../../../../../../shared/constants";

import ProductCard from "../../../../../ProductCard";

class ProductGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadMore: true,
            pageSize: 6,
            page: 1,
            totalProducts: 0,
            products: []
        }
    }

    componentDidMount() {
        this.getTotalProducts(this.state.idCategory);
        this.getProductsInit(this.state.idCategory);
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e);          
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.idCategory !== this.props.idCategory) {            
            this.getTotalProducts(nextProps.idCategory);
            this.getProductsInit(nextProps.idCategory);
        }
    }

    getTotalProducts = idCategory => {
        axios.get(`${API_PORT}/api/Product/GetProductsByIdCategory-${idCategory}`)
            .then(response => response.data)
            .then(data => this.setState({
                totalProducts: data.length,
            }))
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByIdCategory: ` + error));
    }

    getProductsInit = idCategory => {
        const { pageSize } = this.state;
        axios.get(`${API_PORT}/api/Product/GetProductsByIdCategory-${idCategory}`, {
            params: {
                $top: `${pageSize}`
            }
        })
            .then(response => {
                console.log(response)
                return response.data
            })
            .then(data => {
                this.setState({
                    isLoading: true,
                    isLoadMore: true,
                    page: 1,
                    products: data
                })
            })
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByIdCategory: ` + error));
    }

    getProductsMore = idCategory => {
        const { page, pageSize, products } = this.state;
        axios.get(`${API_PORT}/api/Product/GetProductsByIdCategory-${idCategory}`, {
            params: {
                $skip: `${(page - 1) * pageSize}`,
                $top: `${pageSize}`
            }
        })
            .then(response => response.data)
            .then(data => this.setState({
                isLoading: true,
                isLoadMore: true,
                products: [...products, ...data]
            }))
            .catch(error => console.log(`ERROR_ProductGrid_GetProductsByIdCategory: ` + error));
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
        this.setState({
            isLoadMore: false,
            page: this.state.page + 1
        }, () => this.getProductsMore(this.state.idCategory))
    }

    render() {
        console.log("render")
        const { isLoading, totalProducts, products } = this.state
        if (isLoading) {
            return (
                <div className="product-grid">
                    <p>Tổng sản phẩm: {totalProducts}</p>
                    <Row>
                        {products.map(product => {
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
        return (
            <div className="product-grid"><Spin /></div>
        );
    }
}

export default ProductGrid;
