import React, { Component } from "react";
import { Row, Col } from "antd";

class Collection extends Component {
  render() {
    return (
      <div className="collections-wrapper section-gap">
        <div className="container">
          <Row className="collections" gutter={16}>
            <Col xs={24} md={12}>
              <div className="single-collection"></div>
            </Col>
            <Col xs={24} md={12}>
              <div className="single-collection"></div>
            </Col>
          </Row>
          <Row className="collections" gutter={16}>
            <Col xs={24} md={8}>
              <div className="single-collection"></div>
            </Col>
            <Col xs={24} md={16}>
              <div className="single-collection"></div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Collection;
