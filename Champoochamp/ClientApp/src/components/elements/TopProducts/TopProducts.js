/** @jsx jsx */
import { Component, Fragment } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { Spin } from 'antd';

import {
  topProductsName,
  imagesGroup,
  viewportWidth
} from '../../../shared/constants';
import { callAPI } from '../../../shared/utils';
import { colors } from '../../../shared/principles';

import { ProductCard, SectionTitle } from '../index';

const TitleWrapper = styled('div')`
  margin-bottom: 20px;
`;

const nextArrow = css`
  color: ${colors.darkGray};
  cursor: pointer;
  font-size: 20px;
  left: 100%;
  opacity: 0.2;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const prevArrow = css`
  color: ${colors.darkGray};
  cursor: pointer;
  font-size: 20px;
  opacity: 0.2;
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const NextArrow = props => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <i {...arrowProps} className="fas fa-chevron-right" css={nextArrow} />;
};

const PrevArrow = props => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <i {...arrowProps} className="fas fa-chevron-left" css={prevArrow} />;
};

class TopProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      productList: []
    };
  }

  componentDidMount() {
    if (this.props.sectionTitle === topProductsName.discountProducts) {
      const url = `Product/GetAllProducts`;
      const query = `?$filter=isDiscount eq true&$orderby=discountAmount desc&$top=10`;

      callAPI(url, query).then(res =>
        this.setState({
          isLoading: false,
          productList: res.data
        })
      );
    } else if (this.props.sectionTitle === topProductsName.newProducts) {
      const url = `Product/GetAllProducts`;
      const query = `?$orderby=createdDate desc&$top=10`;

      callAPI(url, query).then(res =>
        this.setState({
          isLoading: false,
          productList: res.data
        })
      );
    }
  }

  renderTopProducts = productList =>
    productList.map(product => {
      return (
        <ProductCard
          key={product.id}
          imageGroup={imagesGroup.products}
          product={product}
        />
      );
    });

  render() {
    const { isLoading, productList } = this.state;
    const { sectionTitle } = this.props;
    const settings = {
      infinite: true,
      autoplaySpeed: 5000,
      draggable: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      speed: 500,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: viewportWidth.lg,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: viewportWidth.md,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: viewportWidth.sm,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    return isLoading ? (
      <Spin />
    ) : (
      <Fragment>
        <TitleWrapper>
          <SectionTitle content={sectionTitle}></SectionTitle>
        </TitleWrapper>
        <Slider {...settings}>{this.renderTopProducts(productList)}</Slider>
      </Fragment>
    );
  }
}

export default TopProducts;