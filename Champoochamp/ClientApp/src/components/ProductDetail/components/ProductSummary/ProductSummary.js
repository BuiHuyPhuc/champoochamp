import React, { Component, Fragment } from 'react';
import { notification } from 'antd';
import { withRouter } from 'react-router-dom';

import { time } from '../../../../shared/constants';
import { groupBy, addCartItem } from '../../../../shared/utils';

import { Button } from '../../../elements';
import HeaderInfo from './components/HeaderInfo';
import VariantChoice from './components/VariantChoice';

class ProductSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: groupBy(props.product.productVariant, p => p.colorId),
      colorId: 0,
      sizeId: 0,
      quantity: 1
    };
  }

  getColorId = colorId => {
    this.setState({ colorId });
  };

  getSize = size => {
    this.setState({ sizeId: size.id });
  };

  getQuantity = (productVariantId, quantity) => {
    this.setState({ quantity });
  }

  onAddCartItem = user => {
    const { colorId, sizeId, quantity } = this.state;
    const { product, updateShoppingCart } = this.props;

    if (colorId > 0 && sizeId > 0 && product) {
      if (!user && !typeof Storage) {
        notification.warning({
          message: 'Trình duyệt của bạn không hỗ trợ!',
          placement: 'topRight',
          onClick: () => notification.destroy(),
          duration: time.durationNotification,
        });
        return;
      }

      addCartItem(
        product.id,
        colorId,
        sizeId,
        quantity,
        user,
        updateShoppingCart
      ) ? notification.info({
        message: 'Thêm sản phẩm vào giỏ hàng thành công!',
        placement: 'topRight',
        btn: (
          <div>
            <Button title="Thanh toán" isSecondary onClick={() => this.props.history.push('/thanh-toan')} />
            <Button title="Xem giỏ hàng" isSecondary onClick={() => this.props.onRenderCart(true)} />
          </div>
        ),
        onClick: () => notification.destroy(),
        duration: time.durationNotification,
      }) : notification.warning({
        message: 'Thêm sản phẩm vào giỏ hàng thất bại!',
        placement: 'topRight',
        onClick: () => notification.destroy(),
        duration: time.durationNotification,
      });
    } else {
      notification.warning({
        message: 'Vui lòng chọn kích thước!',
        placement: 'topRight',
        onClick: () => notification.destroy(),
        duration: time.durationNotification,
      });
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

export default withRouter(ProductSummary);
