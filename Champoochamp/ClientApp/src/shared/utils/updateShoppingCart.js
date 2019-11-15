import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';
import getCartTotalQuantity from './getCartTotalQuantity';

const updateShoppingCart = (strShoppingCart, user, updateCartTotalQuantity) => {
  if (user) {
    const url = `Cart/UpdateShoppingCart-${strShoppingCart}-${user.Email}`
    callAPI(url).then(res => {
      if (res.data) {
        updateCartTotalQuantity(getCartTotalQuantity(strShoppingCart));
      }
      else {
        alert('Cập nhật thất bại');
      }
    });
  }
  else {
    localStorage.setItem(storageShoppingCartKey, strShoppingCart);
    updateCartTotalQuantity(getCartTotalQuantity(strShoppingCart));
  }
}

export default updateShoppingCart;