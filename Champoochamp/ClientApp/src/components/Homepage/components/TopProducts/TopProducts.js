import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Spin } from "antd";
import {
  BREAKPOINTS,
  API_PORT,
  TOP_PRODUCTS,
  IMAGE_GROUP
} from "../../../../shared/constants";

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
      axios
        .get(`${API_PORT}/api/Product/GetAllProducts`, {
          params: {
            $filter: "isDiscount eq true",
            $orderby: "discountAmount desc",
            $top: "10"
          }
        })
        .then(response => response.data)
        .then(data =>
          this.setState({
            isLoading: false,
            productList: data
          })
        )
        .catch(error =>
          console.log(`ERROR_TopProducts_GetAllProducts_Discount: ` + error)
        );
    } else if (this.props.sectionTitle === TOP_PRODUCTS.NEW_PRODUCTS) {
      axios
        .get(`${API_PORT}/api/Product/GetAllProducts`, {
          params: {
            $orderby: "createdDate desc",
            $top: "10"
          }
        })
        .then(response => response.data)
        .then(data =>
          this.setState({
            isLoading: false,
            productList: data
          })
        )
        .catch(error =>
          console.log(`ERROR_TopProducts_GetAllProducts_New: ` + error)
        );
    }
  }

  render() {
    const { isLoading, productList } = this.state;
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
          breakpoint: BREAKPOINTS.MD,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: BREAKPOINTS.SM,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    if (isLoading) {
      return (
        <div className="hottest-productList-wrapper section-gap">
          <Spin />
        </div>
      );
    }

    return (
      <div className="hottest-productList-wrapper section-gap">
        <div className="container">
          <SectionTitle sectionTitle={sectionTitle}></SectionTitle>

          <Slider {...settings}>
            {productList.map(product => {
              return (
                <ProductCard
                  key={product.id}
                  imageGroup={IMAGE_GROUP.PRODUCTS}
                  imageName={product.productVariant[0].thumbnail}
                  productName={product.name}
                  productPrice={product.promotionPrice}
                ></ProductCard>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

export default TopProducts;
