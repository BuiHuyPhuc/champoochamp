import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';
import getShoppingCartList from './getShoppingCartList';

const addCartItem = (productId, colorId, sizeId, quantity, userEmail, getShoppingCartCount) => {
  if (userEmail) {
    const url = `Cart/AddCartItem-${productId}-${colorId}-${sizeId}-${quantity}-${userEmail}`;

    callAPI(url).then(res => getShoppingCartCount(getShoppingCartList(res.data).size));
  }
  else {
    const url = `Cart/GetCartItem-${productId}-${colorId}-${sizeId}-${quantity}`;

    callAPI(url).then(res => {
      const strStorage = localStorage.getItem(storageShoppingCartKey);
      const strShoppingCart = strStorage ?
        `${strStorage},${res.data.productVariant.id}-${res.data.quantity}`
        : `${res.data.productVariant.id}-${res.data.quantity}`;

      localStorage.setItem(storageShoppingCartKey, strShoppingCart);
      getShoppingCartCount(getShoppingCartList(strShoppingCart).size);
    });
  }  
}

export default addCartItem;