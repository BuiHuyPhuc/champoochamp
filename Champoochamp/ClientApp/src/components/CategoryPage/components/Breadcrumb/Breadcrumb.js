import React, { Component } from "react";

class Breadcrumb extends Component {
  render() {
    return (
      <div className="container breadcrumb-wrapper first-section-gap">
        <ul className="small-breadcrumb">
          <li className="breadcrumb-item">
            <a className="breadcrumb-link" href="/">
              Trang chủ
            </a>
            <span className="breadcrumb-separator">/</span>
          </li>
          <li className="breadcrumb-item">
            <a className="breadcrumb-link" href="/">
              Nam
            </a>
            <span className="breadcrumb-separator">/</span>
          </li>
          <li className="breadcrumb-item">
            <a className="breadcrumb-link" href="/">
              Áo khoác
            </a>
            <span className="breadcrumb-separator">/</span>
          </li>          
        </ul>
        <h3 className="current-page">Áo khoác mùa đông</h3>
      </div>
    );
  }
}

export default Breadcrumb;
