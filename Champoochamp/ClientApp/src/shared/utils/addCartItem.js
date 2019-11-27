import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';

const addCartItem = (productId, colorId, sizeId, quantity, user, updateShoppingCart) => {  
  if (user) {
    const url = `Cart/AddCartItem-${productId}-${colorId}-${sizeId}-${quantity}-${user.email}`;
    
    callAPI(url).then(res => updateShoppingCart(res.data));
  }
  else {
    const url = `Cart/GetCartItem-${productId}-${colorId}-${sizeId}-${quantity}`;

    callAPI(url).then(res => {
      const strStorage = localStorage.getItem(storageShoppingCartKey);
      const strShoppingCart = strStorage ?
        `${strStorage},${res.data.productVariant.id}-${res.data.quantity}`
        : `${res.data.productVariant.id}-${res.data.quantity}`;

      localStorage.setItem(storageShoppingCartKey, strShoppingCart);
      updateShoppingCart(strShoppingCart);
    });
  }
}

export default addCartItem;