const apiPort = 'http://localhost:4000';

const topProducts = {
  discountProducts: 'Giảm giá',
  newProducts: 'Sản phẩm mới'
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
  category: "Loại sản phẩm",
  product: "Sản phẩm"
}

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

export { apiPort, topProducts, imagesGroup, filtersGroup, searchGroup, sortsGroup };

