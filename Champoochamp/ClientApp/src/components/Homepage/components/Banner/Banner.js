import React, { Component } from "react";
import Slider from "react-slick";

class Banner extends Component {
  render() {
    return (
      <Slider
        className="container"
        infinite
        autoplay
        autoplaySpeed={10000}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <div className="home-banner-wrapper first-section-gap">
          <div className="single-slide">
            <div className="content-wrapper">
              <h2 className="banner-title">
                <span className="inner">Tràn hứng khởi,</span>
                <br />
                <span className="inner">thoả đam mê.</span>
              </h2>
              <a href="/" className="banner-btn">
                Khám phá
              </a>
            </div>
          </div>
        </div>
        <div className="home-banner-wrapper">
          <div className="single-slide">
            <div className="content-wrapper">
              <h2 className="banner-title">
                <span className="inner">Tràn hứng khởi,</span>
                <br />
                <span className="inner">thoả đam mê.</span>
              </h2>
              <a href="/" className="banner-btn">
                Khám phá
              </a>
            </div>
          </div>
        </div>
      </Slider>
    );
  }
}

export default Banner;
