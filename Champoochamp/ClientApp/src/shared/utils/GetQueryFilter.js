import { filtersGroup } from "../constants";

const getQueryByFilterGroup = filterGroup => {
  let query = `(`;

  switch (filterGroup.name) {
    case filtersGroup.size:
      filterGroup.data.forEach((item, index) => {
        if (index === 0) {
          query += `p/sizeId eq ${item.id}`;
        }
        else {
          query += ` or p/sizeId eq ${item.id}`;
        }
      });
      break;
    case filtersGroup.color:
      filterGroup.data.forEach((item, index) => {
        if (index === 0) {
          query += `p/colorId eq ${item.id}`;
        }
        else {
          query += ` or p/colorId eq ${item.id}`;
        }
      });
      break;
    case filtersGroup.brand:
      filterGroup.data.forEach((item, index) => {
        if (index === 0) {
          query += `brandId eq ${item.id}`;
        }
        else {
          query += ` or brandId eq ${item.id}`;
        }
      });
      break;
    default:

      break;
  }

  query += `)`;
  return query;
}

const getQueryByMoneyFilter = currentMoneyFilter => {
  let query = `(`;

  if (!currentMoneyFilter.fromMoney) {
    query += `promotionPrice le ${currentMoneyFilter.toMoney}`
  }
  else if (!currentMoneyFilter.toMoney) {
    query += `promotionPrice ge ${currentMoneyFilter.fromMoney}`
  }
  else {
    query += `promotionPrice ge ${currentMoneyFilter.fromMoney} and promotionPrice le ${currentMoneyFilter.toMoney}`
  }

  query += `)`;
  return query;
}

const getQueryBySortOption = currentSortOption => {
  let query = ``;

  switch (currentSortOption.id) {
    case 0:
      query += `discountAmount desc`
      break;
    case 1:
      query += `createdDate desc`
      break;
    case 2:
      query += `promotionPrice`
      break;
    case 3:
      query += `promotionPrice desc`
      break;
    default:
      break;
  }

  return query;
}

const getQueryFilter = (currentFilterList, currentMoneyFilter, currentSortOption) => {
  let query = `?$filter=`;
  let sizeFilter = [];
  let colorFilter = [];
  let brandFilter = [];

  currentFilterList.forEach(group => {
    switch (group.name) {
      case filtersGroup.size:
        sizeFilter = group;
        break;
      case filtersGroup.color:
        colorFilter = group;
        break;
      case filtersGroup.brand:
        brandFilter = group;
        break;
      default:
        break;
    }
  })
  
  // not filter
  if (sizeFilter.data.length === 0 && colorFilter.data.length === 0 && brandFilter.data.length === 0 && currentMoneyFilter.id === 0) {
    return `?$orderby=${getQueryBySortOption(currentSortOption)}`;
  }

  // query filter size and color
  if (sizeFilter.data.length > 0 && colorFilter.data.length > 0) {
    query += `productVariant/any(p: ${getQueryByFilterGroup(sizeFilter)} and ${getQueryByFilterGroup(colorFilter)})`;
  }
  else if (sizeFilter.data.length > 0) {
    query += `productVariant/any(p: ${getQueryByFilterGroup(sizeFilter)})`;
  }
  else if (colorFilter.data.length > 0) {
    query += `productVariant/any(p: ${getQueryByFilterGroup(colorFilter)})`;
  }

  // query filter brand
  if (brandFilter.data.length > 0) {
    if (sizeFilter.data.length === 0 && colorFilter.data.length === 0) {
      query += `${getQueryByFilterGroup(brandFilter)}`;
    }
    else {
      query += ` and ${getQueryByFilterGroup(brandFilter)}`;
    }
  }

  // query filter money
  if (currentMoneyFilter.id > 0) {
    if (sizeFilter.data.length === 0 && colorFilter.data.length === 0 && brandFilter.data.length === 0) {
      query += `${getQueryByMoneyFilter(currentMoneyFilter)}`;
    }
    else {
      query += ` and ${getQueryByMoneyFilter(currentMoneyFilter)}`;
    }
  }

  // query sort
  query += ` & $orderby=${getQueryBySortOption(currentSortOption)}`;

  return query;
}

export default getQueryFilter;