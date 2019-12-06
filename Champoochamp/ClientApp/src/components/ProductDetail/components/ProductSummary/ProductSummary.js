import React, { Component, Fragment } from 'react';
import { notification } from 'antd';
import { withRouter } from 'react-router-dom';

import { time } from '../../../../shared/constants';
import { groupBy, addCartItem, getShoppingCartList } from '../../../../shared/utils';

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
      quantityMax: 0,
      quantity: 1,
      strShoppingCart: props.strShoppingCart,
      shoppingCartList: getShoppingCartList(props.strShoppingCart)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.strShoppingCart !== prevState.strShoppingCart) {
      return {
        strShoppingCart: nextProps.strShoppingCart,
        shoppingCartList: getShoppingCartList(nextProps.strShoppingCart)
      };
    }

    return null;
  }


  getColorId = colorId => {
    this.setState({
      colorId,
      sizeId: 0,
      quantityMax: this.getQuantityMax(colorId, 0)
    });
  };

  getSize = size => {
    this.setState({
      sizeId: size.id,
      quantityMax: this.getQuantityMax(this.state.colorId, size.id)
    });
  };

  getQuantity = (productVariantId, quantity) => {
    this.setState({ quantity });
  }

  getQuantityMax = (colorId, sizeId) => {
    const { shoppingCartList } = this.state;
    const { product } = this.props;
    const productVariant = product.productVariant.find(p => p.colorId === colorId && p.sizeId === sizeId);

    if (product.totalQuantity <= 0) {
      return -1;
    }

    if (productVariant) {  
      if (shoppingCartList.size > 0 && shoppingCartList.has(productVariant.id)) {
        const quantity = productVariant.quantity - shoppingCartList.get(productVariant.id);
        return quantity > 0 ? quantity : -1;
      }

      return productVariant.quantity;
    }

    return 0;
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
          duration: time.durationNotification
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
      )
      .then(res => {
        if (res) {
          this.setState({
            quantityMax: this.getQuantityMax(this.state.colorId, this.state.sizeId)
          }, () => notification.info({
            message: 'Thêm sản phẩm vào giỏ hàng thành công!',
            placement: 'topRight',
            btn: (
              <div>
                <Button title="Thanh toán" isSecondary onClick={() => this.props.history.push('/thanh-toan')} />
                <Button title="Xem giỏ hàng" isSecondary onClick={() => this.props.onRenderCart(true)} />
              </div>
            ),
            onClick: () => notification.destroy(),
            duration: time.durationNotification
          }));
        }
        else {
          notification.warning({
            message: 'Thêm sản phẩm vào giỏ hàng thất bại!',
            placement: 'topRight',
            onClick: () => notification.destroy(),
            duration: time.durationNotification
          });
        }
      });
    }
    else {
      notification.warning({
        message: 'Vui lòng chọn kích thước!',
        placement: 'topRight',
        onClick: () => notification.destroy(),
        duration: time.durationNotification
      });
    }
  }

  render() {
    const { colors, quantityMax } = this.state;
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
          quantityMax={quantityMax}
        />
        <Button
          title={colors.length > 0 ? (quantityMax > -1 ? 'Thêm vào giỏ' : 'Tạm thời hết hàng') : 'Tạm thời hết hàng'}
          disabled={!(colors.length > 0 && quantityMax > -1)}
          isBlockButton
          onClick={() => this.onAddCartItem(user)}
        />
        {/* <ActionButtons /> */}
      </Fragment>
    );
  }
}

export default withRouter(ProductSummary);
