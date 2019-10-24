import React, { Component } from "react";
import styled from "@emotion/styled";

import ModalSizeSupport from "./ModalSizeSupport";

import COLORS from "../../../../shared/color";
import Divider from "../../../elements/Divider";
import DropDown from "../../../elements/DropDown";
import ActionLink from "../../../elements/ActionLink";
import Button from "../../../elements/Button";

const Wrapper = styled("div")`
  max-width: 100vh;
`;

const ProductName = styled("h3")`
  margin-bottom: 10px;
`;

const NewTag = styled("span")`
  background: ${COLORS.BLACK};
  border-radius: 20px;
  color: ${COLORS.WHITE};
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  margin-bottom: 20px;
  padding: 5px 12px;
  text-transform: uppercase;
`;

const Price = styled("span")`
  display: block;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ShortDescription = styled("p")`
  margin-bottom: 20px;
`;

const ChoiceBox = styled("div")`
  margin: 30px 0;
`;

const SmallTitle = styled("h4")`
  margin-bottom: 15px;
`;

const ColorContainer = styled("div")`
  display: flex;
`;

const SingleColor = styled("div")`
  background: ${props => props.color || COLORS.WHITE};
  border: ${props => (props.isSelected ? `solid 1px ${COLORS.BLACK}` : "none")};
  height: 40px;
  margin-right: 10px;
  width: 40px;
`;

class ProductSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: Math.abs(Date.parse(props.product.createdDate) - Date.parse(new Date())) <= 24 * 60 * 60 * 1000
    };
  }

  callback = selectedOption => {
    // do something.
  };

  renderColor = colors => colors.map((item, index) => {
    return (
      <SingleColor key={item.color.id} color={item.color.code} isSelected={index === 0} />
    );
  })

  render() {
    const { isNew } = this.state;
    const { product, sizes, colors } = this.props; 

    return (
      <Wrapper>
        <ProductName>{product.name}</ProductName>
        {isNew ? <NewTag>New</NewTag> : null}        
        <Price>{product.promotionPrice.toLocaleString()} VND</Price>
        <Price>{product.price.toLocaleString()} VND</Price>
        <ShortDescription>{product.description}</ShortDescription>
        <Divider />
        <ChoiceBox>
          <SmallTitle>Màu sắc</SmallTitle>
          <ColorContainer>
            {this.renderColor(colors)}
          </ColorContainer>
        </ChoiceBox>
        <ChoiceBox>
          <SmallTitle>Size</SmallTitle>
          <DropDown
            title="Chọn size"
            optionList={sizes}
            hasBorder
            callback={this.callback}
          />
          <ModalSizeSupport />
        </ChoiceBox>
        <Button title="Thêm vào giỏ" isBlockButton/>
      </Wrapper>
    );
  }
}

export default ProductSummary;
