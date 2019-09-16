import React, { Component } from "react";
import Slider from "react-slick";

import { BREAKPOINTS } from "../../../../shared/constants";

import ProductCard from "../../../ProductCard";
import SectionTitle from "../SectionTitle";

class TopProducts extends Component {
  render() {
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
          breakpoint: BREAKPOINTS.lg,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: BREAKPOINTS.md,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: BREAKPOINTS.sm,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className="hottest-products-wrapper section-gap">
        <div className="container">
          <SectionTitle sectionTitle={sectionTitle}></SectionTitle>

          <Slider {...settings}>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwbb1d63f5/product_images/0131242100133NEW_01_326.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw66726ef1/product_images/0132436750172NEW_01_569.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dwbef48e9c/product_images/0132454210207NEW_01_510.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw36f2cc14/product_images/0132436750173NEW_01_025.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw8d91954a/product_images/0132436750170NEW_01_041.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
            <ProductCard
              imageUrl="https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw644609c2/product_images/0131242100143NEW_01_510.jpg?sw=458&sh=710&sm=fit"
              name="Casual T-shirt for summer"
              price="1.500.000"
            ></ProductCard>
          </Slider>
        </div>
      </div>
    );
  }
}

export default TopProducts;
