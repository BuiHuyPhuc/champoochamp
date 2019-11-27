const getStrShoppingCart = shoppingCartList => {
  if (shoppingCartList.length > 0) {
    const arr = shoppingCartList.map(p => p.productVariant.id + '-' + p.quantity);
    return arr.join(',');
  }

  return '';
}

export default getStrShoppingCart;