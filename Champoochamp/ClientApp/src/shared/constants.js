const apiPort = 'http://localhost:4000';

const localStorageKey = {
  storageShoppingCartKey: 'MyShoppingCart',
  emailKey: 'ChampoochampEmail',
  passwordKey: 'ChampoochampPassword'
}

const champoochampAddress = {
  city: 'Thành phố Hồ Chí Minh',
  district: 'Quận 1',
}

const ghtk = {
  token: '1eaf5cdc13036460fe42259b4C58eBDcF3855A38',
  apiDev: 'https://dev.ghtk.vn',
  apiTransportFee: '/services/shipment/fee'
}


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

const time = {
  newProductPeriod: 30,
  durationNotification: 3
}

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
  localStorageKey,
  champoochampAddress,
  ghtk,
  filtersGroup,
  imagesGroup,
  time,
  paymentMethod,
  productQuantity,
  searchGroup,
  sortsGroup,
  topProductsName,
  viewportWidth
};
