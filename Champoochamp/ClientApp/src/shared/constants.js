const apiPort = 'http://localhost:4000';

const emailKey = 'ChampoochampEmail';

const filtersGroup = {
  brand: 'Thương hiệu',
  size: 'Kích cỡ',
  color: 'Màu sắc',
  money: 'Giá'
};

const imagesGroup = {
  products: 'products',
  users: 'users',
  collections: 'collections'
};

const newProductPeriod = 30;

const passwordKey = 'ChampoochampPassword';

const paymentMethod = {
  cod: 'COD',
  banking: 'Banking'
};

const productQuantity = {
  min: 1,
  max: 99
};

const searchGroup = {
  category: 'Loại sản phẩm',
  product: 'Sản phẩm'
};

const sortsGroup = [
  {
    id: 0,
    name: 'Nổi bật nhất'
  },
  {
    id: 1,
    name: 'Mới nhất'
  },
  {
    id: 2,
    name: 'Giá tăng dần'
  },
  {
    id: 3,
    name: 'Giá giảm dần'
  }
];

const storageShoppingCartKey = 'MyShoppingCart';

const topProductsName = {
  discountProducts: 'Khuyến mãi hot',
  newProducts: 'Sản phẩm mới',
  relatedProducts: 'Sản phẩm liên quan'
};

const viewportWidth = {
  sm: 575,
  md: 767,
  lg: 991,
  xl: 1200
};

export {
  apiPort,
  emailKey,
  filtersGroup,
  imagesGroup,
  newProductPeriod,
  passwordKey,
  paymentMethod,
  productQuantity,
  searchGroup,
  sortsGroup,
  storageShoppingCartKey,
  topProductsName,
  viewportWidth
};
