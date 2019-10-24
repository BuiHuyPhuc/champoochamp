import React, { Component } from "react";
import Slider from "react-slick";
import { Spin } from "antd";
import { BREAKPOINTS, TOP_PRODUCTS, IMAGE_GROUP } from "../../../../shared/constants";

import CallAPI from "../../../../shared/utils/CallAPI";
import ProductCard from "../../../elements/ProductCard";
import SectionTitle from "../SectionTitle";

class TopProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      productList: []
    };
  }

  componentDidMount() {
    if (this.props.sectionTitle === TOP_PRODUCTS.DISCOUNT_PRODUCTS) {
      const url = `Product/GetAllProducts`;
      const query = `?$filter=isDiscount eq true&$orderby=discountAmount desc&$top=10`;

      CallAPI(url, query).then(res => this.setState({
        isLoading: false,
        productList: res.data
      }));
    }
    else if (this.props.sectionTitle === TOP_PRODUCTS.NEW_PRODUCTS) {
      const url = `Product/GetAllProducts`;
      const query = `?$orderby=createdDate desc&$top=10`;

      CallAPI(url, query).then(res => this.setState({
        isLoading: false,
        productList: res.data
      }));
    }
  }

  renderTopProducts = productList => productList.map(product => {
    return (
      <ProductCard
        key={product.id}
        imageGroup={IMAGE_GROUP.PRODUCTS}
        product={product}
      />
    );
  })

  render() {
    const { isLoading, productList } = this.state;
    const { sectionTitle } = this.props;
    const settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 5,
      slidesToScroll: 5,
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
        <div className="hottest-productList-wrapper section-gap"><Spin /></div>
      );
    }

    return (
      <div className="hottest-productList-wrapper section-gap">
        <div className="container">
          <SectionTitle sectionTitle={sectionTitle}></SectionTitle>

          <Slider {...settings}>
            {this.renderTopProducts(productList)}
          </Slider>
        </div>
      </div>
    );
  }
}

export default TopProducts;
