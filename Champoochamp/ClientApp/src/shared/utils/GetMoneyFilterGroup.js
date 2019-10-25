import { filtersGroup } from "../constants";

const getMoneyFilterGroup = () => {
  let moneyFilterGroup = {
    name: filtersGroup.money,
    data: [
      { id: 1, fromMoney: null, toMoney: 100000 },
      { id: 2, fromMoney: 100000, toMoney: 200000 },
      { id: 3, fromMoney: 200000, toMoney: 300000 },
      { id: 4, fromMoney: 300000, toMoney: null },
    ]
  }

  return moneyFilterGroup;
}

export default getMoneyFilterGroup;