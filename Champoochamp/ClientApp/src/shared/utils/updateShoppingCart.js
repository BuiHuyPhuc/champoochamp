import { storageShoppingCartKey } from '../constants';
import callAPI from './callAPI';
import getShoppingCartList from './getShoppingCartList';

const updateShoppingCart = (strShoppingCart, userEmail, getShoppingCartCount) => {
  if (userEmail) {
    const url = `Cart/UpdateShoppingCart-${strShoppingCart}-${userEmail}`
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