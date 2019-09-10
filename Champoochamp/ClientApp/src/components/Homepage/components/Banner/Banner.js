import React, { Component } from "react";
import { Row, Col } from "antd";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bannerImg1 from "../../../../assets/banner1.jpg";
import bannerImg2 from "../../../../assets/banner2.jpg";
import bannerImg3 from "../../../../assets/banner3.jpg";

class Banner extends Component {
  render() {
    return (
      <div className="home-banner-wrapper section-gap">
        <div className="container">
          <Row className="home-banner" type="flex" align="middle">
            <Col xs={24} md={14}>
              <div className="slider-wrapper">
                <Slider
                  dots={true}
                  infinite={true}
                  autoplay={true}
                  autoplaySpeed={10000}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                >
                  <img className="single-image" src={bannerImg1} alt=""></img>
                  <img className="single-image" src={bannerImg2} alt=""></img>
                  <img className="single-image" src={bannerImg3} alt=""></img>
                </Slider>
              </div>
            </Col>

            <Col xs={24} md={10}>
              <div className="content-wrapper">
                <h2 className="banner-title">
                  Tràn hứng khởi, <br />
                  thoả đam mê.
                </h2>
                <p className="sub-title">
                  Thoả sức sáng tạo với bộ sưu tập xuân hè năm 2019, với các mẫu
                  thiết kế đến từ những tên tuổi nổi tiếng toàn cầu.
                </p>
                <a href="/" className="primary-btn">
                  Khám phá
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Banner;
