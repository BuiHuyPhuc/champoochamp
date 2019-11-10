import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';

import { breakpoint } from '../../../../shared/principles';

import img1 from '../../../../assets/banners/banner1.jpg';
import img2 from '../../../../assets/banners/banner2.jpg';
import img3 from '../../../../assets/banners/banner3.jpg';
import img4 from '../../../../assets/banners/banner4.jpg';

const SingleSlide = styled('div')`
  background: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center center;
  height: 80vh;
  margin-top: 80px;

  ${breakpoint.sm`
   margin-top: 60px;
  `}
`;

class Banner extends Component {
  render() {
    return (
      <Slider
        dots={true}
        infinite
        autoplay
        autoplaySpeed={10000}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <SingleSlide imageUrl={img3} />
        <SingleSlide imageUrl={img4} />
        <SingleSlide imageUrl={img1} />
        <SingleSlide imageUrl={img2} />
      </Slider>
    );
  }
}

export default Banner;
