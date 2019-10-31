import React, { Component } from "react";

import { callAPI, groupBy } from '../../../../shared/utils';

import { Button } from '../../../elements';
import HeaderInfo from './components/HeaderInfo';
import VariantChoice from './components/VariantChoice';
import ActionButtons from './components/ActionButtons';

class ProductSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: groupBy(props.product.productVariant, p => p.colorId),
      colorId: 0,
      sizeId: 0,
      productVariant: null
    };
  }

  getColorId = colorId => {
    this.setState({ colorId })
  };

  getSize = size => {
    this.setState({ sizeId: size.id })
  };

  onClick = () => {
    const {
      colorId,
      sizeId
    } = this.state;
    const { product } = this.props;

    if (colorId > 0 && sizeId > 0 && product) {
      const url = `ProductVariant/GetProductVariantByIdPCS-${product.id}-${colorId}-${sizeId}`
      callAPI(url).then(res =>
        this.setState({
          productVariant: res.data
        }, () => {
          console.log(this.state.productVariant)
        })
      );
    }
  }

  render() {
    const { colors } = this.state;
    const { product, getImageUrls } = this.props; 
    
    return (      
      <div>
        <HeaderInfo product={product} />
        <VariantChoice product={product} colors={colors} getImageUrls={getImageUrls} getColorId={this.getColorId} getSize={this.getSize} />
        <Button title="Thêm vào giỏ" isBlockButton onClick={this.onClick} />
        <ActionButtons />
      </div>
    );
  }
}

export default ProductSummary;
