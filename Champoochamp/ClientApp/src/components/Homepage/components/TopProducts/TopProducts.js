import React, { Component } from "react";
import Slider from "react-slick";
import { Spin } from "antd";

import { topProducts, imagesGroup } from "../../../../shared/constants";
import { callAPI } from "../../../../shared/utils";

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
    if (this.props.sectionTitle === topProducts.discountProducts) {
      const url = `Product/GetAllProducts`;
      const query = `?$filter=isDiscount eq true&$orderby=discountAmount desc&$top=10`;

      callAPI(url, query).then(res => this.setState({
        isLoading: false,
        productList: res.data
      }));
    }
    else if (this.props.sectionTitle === topProducts.newProducts) {
      const url = `Product/GetAllProducts`;
      const query = `?$orderby=createdDate desc&$top=10`;

      callAPI(url, query).then(res => this.setState({
        isLoading: false,
        productList: res.data
      }));
    }
  }

  renderTopProducts = productList => productList.map(product => {
    return (
      <ProductCard
        key={product.id}
        imageGroup={imagesGroup.products}
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
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
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
