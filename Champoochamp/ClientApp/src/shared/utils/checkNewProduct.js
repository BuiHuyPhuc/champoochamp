import { time } from '../constants';

const checkNewProduct = productCreateDate => {
  return (
    Math.abs(Date.parse(productCreateDate) - Date.parse(new Date())) <=
    time.newProductPeriod * 60 * 60 * 1000
  );
};

export default checkNewProduct;
