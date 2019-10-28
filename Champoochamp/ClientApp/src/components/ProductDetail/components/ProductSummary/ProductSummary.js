import React, { Component } from "react";

import { Button } from '../../../elements';
import HeaderInfo from './components/HeaderInfo';
import VariantChoice from './components/VariantChoice';
import SizeReference from './components/SizeReference';

class ProductSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorId: 0,
      sizeId: 0
    };
  }

  getColorId = colorId => {
    this.setState({ colorId })
  };

  getSize = size => {
    this.setState({ sizeId: size.id })
  };

  render() {
    const { product, getImageUrls } = this.props; 

    return (      
      <div>
        <HeaderInfo product={product} />
        <VariantChoice product={product} getImageUrls={getImageUrls} getColorId={this.getColorId} getSize={this.getSize} />
        <SizeReference />
        <Button title="Thêm vào giỏ" isBlockButton />
      </div>
    );
  }
}

export default ProductSummary;
