const getObjectById = (arr, id) => {
  let obj = null;
  arr.forEach(item => {
    if (item.id === id) {
      obj = item;
    }
  });

  return obj;
}

export default getObjectById;