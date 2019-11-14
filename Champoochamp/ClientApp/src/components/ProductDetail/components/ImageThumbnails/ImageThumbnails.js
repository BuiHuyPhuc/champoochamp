import React, { Component } from 'react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import { breakpoint, colors } from '../../../../shared/principles';
import { getImageUrl } from '../../../../shared/utils';
import { imagesGroup } from '../../../../shared/constants';

import { Image } from '../../../elements';

const Wrapper = styled('div')`
  .slick-dots {
    bottom: 0;
    margin-top: 20px;
    position: relative;

    li {
      height: auto;
      margin: 10px;
      width: 70px;
      
      &.slick-active {
        border: solid 1px ${colors.black};
      }
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
  renderImage = imageUrls => imageUrls.map((url, index) => {    
    return (
      <div key={index}>
        <Image imageUrl={getImageUrl(url, imagesGroup.products)} alt="" />
      </div>
    );
  });

  render() {
    const { imageUrls } = this.props;
    const imgSources = imageUrls.map(url => getImageUrl(url, imagesGroup.products));
    
    const settings = {
      customPaging: function (i) {
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
          {this.renderImage(imageUrls)}
        </Slider>
      </Wrapper>
    );
  }
}

export default ImageThumbnails;
