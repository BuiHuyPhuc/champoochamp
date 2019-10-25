import React, { Component } from "react";

import { Button } from '../../../elements';
import HeaderInfo from './components/HeaderInfo';
import VariantChoice from './components/VariantChoice';

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

  //renderColor = colors => colors.map((item, index) => {
  //  return (
  //    <SingleColor key={item.color.id} color={item.color.code} isSelected={index === 0} />
  //  );
  //})

  render() {
    //const { isNew } = this.state;
    //const { product, sizes, colors } = this.props; 

    return (      
      <div>
        <HeaderInfo />
        <VariantChoice />
        <Button title="Thêm vào giỏ" isBlockButton />
      </div>

      //<Wrapper>
      //  <ProductName>{product.name}</ProductName>
      //  {isNew ? <NewTag>New</NewTag> : null}        
      //  <Price>{product.promotionPrice.toLocaleString()} VND</Price>
      //  <Price>{product.price.toLocaleString()} VND</Price>
      //  <ShortDescription>{product.description}</ShortDescription>
      //  <Divider />
      //  <ChoiceBox>
      //    <SmallTitle>Màu sắc</SmallTitle>
      //    <ColorContainer>
      //      {this.renderColor(colors)}
      //    </ColorContainer>
      //  </ChoiceBox>
      //  <ChoiceBox>
      //    <SmallTitle>Size</SmallTitle>
      //    <DropDown
      //      title="Chọn size"
      //      optionList={sizes}
      //      hasBorder
      //      callback={this.callback}
      //    />
      //    <ModalSizeSupport />
      //  </ChoiceBox>
      //  <Button title="Thêm vào giỏ" isBlockButton/>
      //</Wrapper>
    );
  }
}

export default ProductSummary;
