const formatMoney = (money, isLocaleString) => {
  const value = Math.round(money / 1000) * 1000;
  return isLocaleString ? value.toLocaleString() : value;
}

export default formatMoney;