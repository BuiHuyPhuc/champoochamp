import getShoppingCartList from './getShoppingCartList';

const getCartTotalQuantity = strShoppingCart => {
  if (!strShoppingCart) {
    return 0;
  }

  return Array.from(getShoppingCartList(strShoppingCart).values())
        .reduce((a, b) => a + b, 0);
}

export default getCartTotalQuantity;