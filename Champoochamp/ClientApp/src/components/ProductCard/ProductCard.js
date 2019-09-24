import React, { Component } from "react";
import { Icon } from "antd";

class ProductCard extends Component {
    getImageUrl = (imageName, imageGroup) => require(`../../assets/images/${imageGroup}/${imageName}`)

    render() {
        const { imageName, imageGroup, name, price } = this.props;

        return (
            <div className="card">
                <div className="card-header">
                    <img src={this.getImageUrl(imageName, imageGroup)} alt=""></img>
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
