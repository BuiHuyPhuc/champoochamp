import React, { Component } from "react";
import styled from "@emotion/styled";

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
      sizes: [
        {
          id: 0,
          name: "S"
        },
        {
          id: 1,
          name: "M"
        },
        {
          id: 2,
          name: "L"
        },
        {
          id: 3,
          name: "XL"
        },
        {
          id: 4,
          name: "XXL"
        }
      ]
    };
  }

  callback = selectedOption => {
    // do something.
  };

  render() {
    const { sizes } = this.state;
    return (
      <Wrapper>
        <ProductName>Navigation Jacket</ProductName>
        <NewTag>New</NewTag>
        <Price>450.000 VND</Price>
        <ShortDescription>
          Bundle up in this wool-blend layer. With warm pockets, a high neck,
          and a long length for warmth, you'll be feeling total coziness.
        </ShortDescription>
        <Divider />
        <ChoiceBox>
          <SmallTitle>Màu sắc</SmallTitle>
          <ColorContainer>
            <SingleColor isSelected color="#B0D5C1" />
            <SingleColor color="#989CA0" />
            <SingleColor color="#E6BDA7" />
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
          <ActionLink title="Hướng dẫn chọn size" isUnderline/>
        </ChoiceBox>
        <Button title="Thêm vào giỏ" isBlockButton/>
      </Wrapper>
    );
  }
}

export default ProductSummary;
