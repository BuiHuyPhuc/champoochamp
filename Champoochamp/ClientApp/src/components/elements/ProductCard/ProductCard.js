import React, { Component } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import COLORS from "../../../shared/color";
import Image from "../Image";

const Wrapper = styled("div")`
  background: ${COLORS.WHITE};
  margin-bottom: 10px;
  padding: 10px;
  border: solid 1px transparent;

  &:hover {
    border: solid 1px ${COLORS.GRAY};
  }
`;

const ColorsWrapper = styled("div")`
  display: flex;
  margin: 10px 0;
`;

const SingleColor = styled("button")`
  border: solid 1px transparent;
  margin-right: 3px;
  outline: none;
  padding: 1px;

  &:hover {
    border: solid 1px ${COLORS.BLACK};
  }
`;

const ColorInner = styled("div")`
  background: ${props => (props.color ? props.color : "gray")};
  height: 15px;
  width: 15px;
`;

const Name = styled("div")`
  font-weight: 600;
  letter-spacing: 0.8px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Price = styled("span")`
  color: ${COLORS.DARK_GRAY};
  display: block;
`;

class ProductCard extends Component {
  getImageUrl = (imageName, imageGroup) =>
    require(`../../../assets/images/${imageGroup}/${imageName}`);

  render() {
    const { imageGroup, imageName, productName, productPrice } = this.props;

    return (
      <a href="/">
        <Wrapper>
          <Image
            imageUrl={this.getImageUrl(imageName, imageGroup)}
            alt=""
          ></Image>
          <ColorsWrapper>
            <SingleColor>
              <ColorInner color="#DFB3AE"></ColorInner>
            </SingleColor>
            <SingleColor>
              <ColorInner color="#E5BD62"></ColorInner>
            </SingleColor>
            <SingleColor>
              <ColorInner color="#D0665A"></ColorInner>
            </SingleColor>
          </ColorsWrapper>
          <Name>{productName}</Name>
          <Price>{productPrice.toLocaleString()} VND</Price>
        </Wrapper>
      </a>
    );
  }
}

ProductCard.propTypes = {
  imageGroup: PropTypes.string,
  imageName: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.number
};

export default ProductCard;
