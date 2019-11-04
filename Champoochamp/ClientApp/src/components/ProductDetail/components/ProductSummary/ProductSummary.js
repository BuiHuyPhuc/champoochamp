import React, { Component } from "react";

import { callAPI, groupBy, getShoppingCartList } from '../../../../shared/utils';

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
      shoppingCartList: []
    };
  }

  getColorId = colorId => {
    this.setState({ colorId });
  };

  getSize = size => {
    this.setState({ sizeId: size.id });    
  };

  addCartItem = () => {
    const {
      colorId,
      sizeId
    } = this.state;
    const { product, getCartAllItem } = this.props;
    const userEmail = 'buihuyphuc97@gmail.com';
    const quantity = 1;

    if (colorId > 0 && sizeId > 0 && product) {
      const url = `Cart/AddCartItem-${product.id}-${colorId}-${sizeId}-${quantity}-${userEmail}`
      callAPI(url).then(res =>
        this.setState({
          shoppingCartList: getShoppingCartList(res.data)
        }, () => getCartAllItem(this.state.shoppingCartList.size))
      );
    }
    else {
      alert('Vui lòng chọn size')
    }
  }

  getShoppingCart = (userEmail) => {
    const url = `Cart/GetShoppingCart-${userEmail}`
    callAPI(url).then(res =>
      this.setState({
        shoppingCartList: res.data
      })
    );
  }

  render() {
    const { colors } = this.state;
    const { product, getImageUrls } = this.props;
    console.log(this.state.shoppingCartList);
    return (
      <div>
        <HeaderInfo product={product} />
        <VariantChoice product={product} colors={colors} getImageUrls={getImageUrls} getColorId={this.getColorId} getSize={this.getSize} />
        <Button title="Thêm vào giỏ" isBlockButton onClick={() => this.getShoppingCart(`buihuyphuc97@gmail.com`)} />
        <ActionButtons />
      </div>
    );
  }
}

export default ProductSummary;
