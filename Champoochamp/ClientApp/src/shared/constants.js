const apiPort = 'http://localhost:4000';

const newProductInDays = 30;

const storageShoppingCartKey = 'MyShoppingCart';

const minProductQuantity = 1;

const maxProductQuantity = 99;

const viewportWidth = {
  sm: 575,
  md: 767,
  lg: 991,
  xl: 1200
};

const topProductsName = {
  discountProducts: 'Khuyến mãi hot',
  newProducts: 'Sản phẩm mới',
  relatedProducts: 'Sản phẩm liên quan'
};

const imagesGroup = {
  products: 'products',
  users: 'users',
  collections: 'collections'
};

const filtersGroup = {
  brand: 'Thương hiệu',
  size: 'Kích cỡ',
  color: 'Màu sắc',
  money: 'Giá'
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

export {
  apiPort,
  newProductInDays,
  storageShoppingCartKey,
  minProductQuantity,
  maxProductQuantity,
  viewportWidth,
  topProductsName,
  imagesGroup,
  filtersGroup,
  searchGroup,
  sortsGroup
};
