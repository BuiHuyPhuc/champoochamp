import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';
import getShoppingCartList from './getShoppingCartList';

const updateShoppingCart = (strShoppingCart, user, getShoppingCartCount) => {
  if (user) {
    const url = `Cart/UpdateShoppingCart-${strShoppingCart}-${user.Email}`
    callAPI(url).then(res => {
      if (res.data) {
        getShoppingCartCount(getShoppingCartList(strShoppingCart).size);
      }
      else {
        alert('Cập nhật thất bại');
      }
    });
  }
  else {
    localStorage.setItem(storageShoppingCartKey, strShoppingCart);
    getShoppingCartCount(getShoppingCartList(strShoppingCart).size);
  }
}

export default updateShoppingCart;