import { localStorageKey } from '../constants';
import callAPI from './callAPI';

const addCartItem = (productId, colorId, sizeId, quantity, user, updateShoppingCart) => {  
  if (user) {
    const url = `Cart/AddCartItem-${productId}-${colorId}-${sizeId}-${quantity}-${user.email}`;
    
    callAPI(url).then(res => {
      if (res.data) {
        updateShoppingCart(res.data);
        return true;
      }
      else {
        return false;
      }
      
    });
  }
  else {
    const url = `Cart/GetCartItem-${productId}-${colorId}-${sizeId}-${quantity}`;

    callAPI(url).then(res => {
      if (res.data) {
        const strStorage = localStorage.getItem(localStorageKey.storageShoppingCartKey);
        const strShoppingCart = strStorage ?
          `${strStorage},${res.data.productVariant.id}-${res.data.quantity}`
          : `${res.data.productVariant.id}-${res.data.quantity}`;

        localStorage.setItem(localStorageKey.storageShoppingCartKey, strShoppingCart);
        updateShoppingCart(strShoppingCart);
        return true;
      }
      else {
        return false;
      }      
    });
  }
}

export default addCartItem;