const getShoppingCartList = strShoppingCart => {
  if (!strShoppingCart) {
    return [];
  }

  const arr1 = strShoppingCart.split(',');
  arr1.pop();
  let map = new Map();

  arr1.forEach(item => {
    const arr2 = item.split('-');
    if (map.has(arr2[0])) {
      const value = map.get(arr2[0]);
      map.set(arr2[0], value + parseInt(arr2[1], 10));
    }
    else {
      map.set(arr2[0], parseInt(arr2[1], 10));
    }
  })

  return map;
}

export default getShoppingCartList;