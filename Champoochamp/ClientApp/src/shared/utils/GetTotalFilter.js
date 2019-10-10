const GetTotalFilter = filterList => {
  let total = 0;

  filterList.forEach(group => {
    total += group.data.length;
  })

  return total;
}

export default GetTotalFilter;