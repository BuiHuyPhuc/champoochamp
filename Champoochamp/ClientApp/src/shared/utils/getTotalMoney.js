const getTotalMoney = (shoppingCartList, discountRate = 0) => {
  const total = shoppingCartList.reduce((a, b) => a + (b.productVariant.product.promotionPrice * b.quantity), 0);
  const discount = (1 - discountRate / 100);
  return total * discount;
}

export default getTotalMoney;