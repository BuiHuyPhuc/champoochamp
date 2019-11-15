import React, { Component, Fragment } from 'react';

import { groupBy, addCartItem } from '../../../../shared/utils';

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
      quantity: 0
    };
  }

  getColorId = colorId => {
    this.setState({ colorId });
  };

  getSize = size => {
    this.setState({ sizeId: size.id });
  };

  getQuantity = quantity => {
    this.setState({ quantity });
  }

  onAddCartItem = user => {
    const { colorId, sizeId, quantity } = this.state;
    const { product, updateCartTotalQuantity } = this.props;

    if (colorId > 0 && sizeId > 0 && product) {
      if (!user && !typeof Storage) {
        alert('Trình duyệt của bạn không hỗ trợ');
        return;
      }

      addCartItem(
        product.id,
        colorId,
        sizeId,
        quantity,
        user,
        updateCartTotalQuantity
      );
      alert('Thêm thành công');
    } else {
      alert('Vui lòng chọn size');
    }
  };
  
  render() {
    const { colors } = this.state;
    const { product, getImageUrls, user } = this.props;

    return (
      <Fragment>
        <HeaderInfo product={product} />
        <VariantChoice
          product={product}
          colors={colors}
          getImageUrls={getImageUrls}
          getColorId={this.getColorId}
          getSize={this.getSize}
          getQuantity={this.getQuantity}
        />
        <Button
          title="Thêm vào giỏ"
          isBlockButton
          onClick={() => this.onAddCartItem(user)}
        />
        {/* <ActionButtons /> */}
      </Fragment>
    );
  }
}

export default ProductSummary;
