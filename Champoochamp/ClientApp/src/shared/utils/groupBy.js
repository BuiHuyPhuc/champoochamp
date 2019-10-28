const groupBy = (list, keyGetter) => {
  const map = new Map();
  let arr = [];

  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
      arr.push(item);
    } else {
      collection.push(item);
    }
  });

  return arr;
}

export default groupBy;