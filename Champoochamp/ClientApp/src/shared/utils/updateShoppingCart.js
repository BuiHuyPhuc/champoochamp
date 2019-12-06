import { localStorageKey } from '../constants';
import callAPI from './callAPI';

const updateShoppingCart = (strShoppingCart, user, updateShoppingCart) => {
  if (user) {
    if (!strShoppingCart) {
      strShoppingCart = null;
    }

    const url = `Cart/UpdateShoppingCart`;
    const data = {
      email: user.email,
      shoppingCarts: strShoppingCart
    };

    callAPI(url, '', 'POST', data).then(res => {
      if (res.data) {
        updateShoppingCart(strShoppingCart);
      }
    });
  }
  else {
    localStorage.setItem(localStorageKey.storageShoppingCartKey, strShoppingCart);
    updateShoppingCart(strShoppingCart);
  }
}

export default updateShoppingCart;