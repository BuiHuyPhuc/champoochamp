import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';

const updateShoppingCart = (strShoppingCart, user, updateShoppingCart) => {
  if (user) {
    if (!strShoppingCart) {
      strShoppingCart = null;
    }

    const url = `Cart/UpdateShoppingCart-${strShoppingCart}-${user.email}`
    callAPI(url).then(res => {
      if (res.data) {
        updateShoppingCart(strShoppingCart);
      }
      else {
        alert('Cập nhật thất bại');
      }
    });
  }
  else {
    localStorage.setItem(storageShoppingCartKey, strShoppingCart);
    updateShoppingCart(strShoppingCart);
  }
}

export default updateShoppingCart;