import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Spin } from "antd";
import { BREAKPOINTS, API_PORT, TOP_PRODUCTS, IMAGE_GROUP } from "../../../../shared/constants";

import ProductCard from "../../../ProductCard";
import SectionTitle from "../SectionTitle";

class TopProducts extends Component {
    state = {
        isLoading: false,
        products: []
    }

    componentDidMount() {
        if (this.props.sectionTitle === TOP_PRODUCTS.DISCOUNT_PRODUCTS) {
            axios.get(`${API_PORT}/api/Product/GetAllProducts`, {
                params: {
                    $filter: "isDiscount eq true",
                    $orderby: "discountAmount desc",
                    $top: "6"
                }
            })
                .then(response => response.data)
                .then(data => this.setState({
                    isLoading: true,
                    products: data
                }))
                .catch(error => console.log(`ERROR_TopProducts_GetAllProducts_Discount: ` + error));
        }
        else if (this.props.sectionTitle === TOP_PRODUCTS.NEW_PRODUCTS) {
            axios.get(`${API_PORT}/api/Product/GetAllProducts`, {
                params: {
                    $orderby: "createdDate desc",
                    $top: "6"
                }
            })
                .then(response => response.data)
                .then(data => this.setState({
                    isLoading: true,
                    products: data
                }))
                .catch(error => console.log(`ERROR_TopProducts_GetAllProducts_New: ` + error));
        }
    }

    render() {
        const { isLoading, products } = this.state;
        const { sectionTitle } = this.props;

        const settings = {
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 4,
            speed: 500,
            responsive: [
                {
                    breakpoint: BREAKPOINTS.LG,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: BREAKPOINTS.MD,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: BREAKPOINTS.SM,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        if (isLoading) {
            return (
                <div className="hottest-products-wrapper section-gap">
                    <div className="container">
                        <SectionTitle sectionTitle={sectionTitle}></SectionTitle>

                        <Slider {...settings}>
                            {products.map(product => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        imageGroup={IMAGE_GROUP.PRODUCTS}
                                        imageName={product.productVariant[0].thumbnail}
                                        name={product.name}
                                        price={product.promotionPrice}>
                                    </ProductCard>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            );
        }

        return (
            <div className="hottest-products-wrapper section-gap"><Spin /></div>
        );        
    }
}

export default TopProducts;
