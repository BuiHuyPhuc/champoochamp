import React, { Component } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import { breakpoint } from '../../../../shared/principles';

import { Image } from '../../../elements';
import exampleImg1 from '../../../../assets/images/products/000105_1.jpg';
import exampleImg2 from '../../../../assets/images/products/000207_1.jpg';
import exampleImg3 from '../../../../assets/images/products/000702_1.jpg';
import exampleImg4 from '../../../../assets/images/products/000302_1.jpg';

const Wrapper = styled('div')`
  .slick-dots {
    bottom: 0;
    margin-top: 20px;
    position: relative;

    li {
      height: auto;
      margin: 10px;
      width: 70px;
    }
  }

  ${breakpoint.md`
    margin-bottom: 50px;

    .slick-dots {
      li{
        width: 50px;
      }
    }
  `}
`;

class ImageThumbnails extends Component {
  render() {
    const imgSources = [
      exampleImg1,
      exampleImg2,
      exampleImg3,
      exampleImg4,
      exampleImg1,
      exampleImg2
    ];
    const settings = {
      customPaging: function(i) {
        return (
          <div>
            <Image imageUrl={imgSources[i]} alt="" />
          </div>
        );
      },
      arrows: false,
      dots: true,
      dotsClass: 'slick-dots',
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Wrapper>
        <Slider {...settings}>
          <div>
            <Image imageUrl={exampleImg1} alt="" />
          </div>
          <div>
            <Image imageUrl={exampleImg2} alt="" />
          </div>
          <div>
            <Image imageUrl={exampleImg3} alt="" />
          </div>
          <div>
            <Image imageUrl={exampleImg4} alt="" />
          </div>
          <div>
            <Image imageUrl={exampleImg1} alt="" />
          </div>
          <div>
            <Image imageUrl={exampleImg2} alt="" />
          </div>
        </Slider>
      </Wrapper>
    );
  }
}

export default ImageThumbnails;
