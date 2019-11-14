import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';
import getCartTotalQuantity from './getCartTotalQuantity';

const addCartItem = (productId, colorId, sizeId, quantity, user, updateCartTotalQuantity) => {  
  if (user) {
    const url = `Cart/AddCartItem-${productId}-${colorId}-${sizeId}-${quantity}-${user.Email}`;

    callAPI(url).then(res => updateCartTotalQuantity(getCartTotalQuantity(res.data)));
  }
  else {
    const url = `Cart/GetCartItem-${productId}-${colorId}-${sizeId}-${quantity}`;

    callAPI(url).then(res => {
      const strStorage = localStorage.getItem(storageShoppingCartKey);
      const strShoppingCart = strStorage ?
        `${strStorage},${res.data.productVariant.id}-${res.data.quantity}`
        : `${res.data.productVariant.id}-${res.data.quantity}`;

      localStorage.setItem(storageShoppingCartKey, strShoppingCart);
      updateCartTotalQuantity(getCartTotalQuantity(strShoppingCart));
    });
  }
}

export default addCartItem;