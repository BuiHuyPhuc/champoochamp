const checkCurrentFilter = (currentFilterList, currentMoneyFilter) => {
  if (currentFilterList[0].data.length > 0 || currentFilterList[1].data.length > 0 ||
    currentFilterList[2].data.length > 0 || currentMoneyFilter.id !== 0) {
    return true;
  }

  return false;
}

export default checkCurrentFilter;