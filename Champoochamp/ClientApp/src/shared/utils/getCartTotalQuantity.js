import getShoppingCartList from './getShoppingCartList';

const getCartTotalQuantity = strShoppingCart => {
  return Array.from(getShoppingCartList(strShoppingCart).values())
        .reduce((a, b) => a + b, 0);
}

export default getCartTotalQuantity;