import React, { Component } from "react";
import { Row, Col } from "antd";
import Slider from "react-slick";

class HottestProducts extends Component {
  render() {
    return (
      <div className="hottest-products-wrapper section-gap">
        <div className="container">
          <div className="section-title-wrapper">
            <h3 className="section-title">Top giảm giá</h3>
            
          </div>

          <Slider
            dots={true}
            infinite={true}
            autoplay={true}
            autoplaySpeed={10000}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            <Row className="product-grid" gutter={16}>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="product-grid" gutter={16}>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={8} xl={6}>
                <div className="single-product">
                  <div className="product-image"></div>
                  <div className="product-detail">
                    <div>
                      <strong>Casual T-shirt for summer</strong>
                    </div>
                    <span>1.500.000 VND</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Slider>
        </div>
      </div>
    );
  }
}

export default HottestProducts;
