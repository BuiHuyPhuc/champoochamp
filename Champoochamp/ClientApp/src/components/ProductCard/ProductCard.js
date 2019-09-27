import React, { Component } from "react";
import { Icon } from "antd";

class ProductCard extends Component {

  render() {
    const { imageUrl, name, price } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <img src={imageUrl} alt=""></img>
        </div>
        <div className="card-body">
          <strong>{name}</strong>
          <p>{price} VND</p>
          <div className="quick-actions">
            <span className="quick-look">Xem nhanh</span>
            <Icon type="right" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
