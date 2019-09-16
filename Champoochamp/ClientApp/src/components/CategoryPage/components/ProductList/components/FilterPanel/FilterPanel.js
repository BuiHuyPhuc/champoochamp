import React, { Component } from "react";
import { Row, Col, Icon, Collapse } from "antd";

const { Panel } = Collapse;

class FilterPanel extends Component {
  render() {
    return (
      <div className="filter-panel">
        <div className="filter-header">
          <span className="title-text">Bộ lọc</span>
          <div className="selected-items-wrapper">
            <span className="selected-item">
              Trắng
              <Icon type="close" className="delete-filter" />
            </span>
            <span className="selected-item">
              S
              <Icon type="close" className="delete-filter" />
            </span>
            <span className="selected-item">
              Đỏ
              <Icon type="close" className="delete-filter" />
            </span>
            <span className="selected-item">
              Thân thiện môi trường
              <Icon type="close" className="delete-filter" />
            </span>
            <span className="selected-item">
              Đi mưa
              <Icon type="close" className="delete-filter" />
            </span>
          </div>
        </div>

        <Collapse
          className="filter-body"
          bordered={false}
          expandIconPosition="right"
        >
          <Panel
            className="filter-item"
            header={<span className="filter-item-title">Loại</span>}
          >
            <Row>
              <Col span={12}>
                <button className="single-filter">Vải dù</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Thun trơn</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Thấm mồ hôi</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Thoáng mát</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Vải dù</button>
              </Col>
            </Row>
          </Panel>
          <Panel
            className="filter-item"
            header={<span className="filter-item-title">Kích cỡ</span>}
          >
            <Row>
              <Col span={12}>
                <button className="single-filter">S</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">M</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">L</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">XL</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">XXL</button>
              </Col>
            </Row>
          </Panel>
          <Panel
            className="filter-item"
            header={<span className="filter-item-title">Màu sắc</span>}
          >
            <Row>
              <Col span={12}>
                <button className="single-filter">Đỏ</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Xanh ngọc</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Cam đất</button>
              </Col>
              <Col span={12}>
                <button className="single-filter">Đen</button>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default FilterPanel;
