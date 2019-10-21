// Responsive breakpoints

const BREAKPOINTS = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200
};

const API_PORT = "http://localhost:4000";

const TOP_PRODUCTS = {
  DISCOUNT_PRODUCTS: "Giảm giá",
  NEW_PRODUCTS: "Sản phẩm mới"
};

const IMAGE_GROUP = {
  PRODUCTS: "products",
  USERS: "users",
  COLLECTIONS: "collections"
};

const FILTER_GROUP = {
  BRAND: "Thương hiệu",
  SIZE: "Kích cỡ",
  COLOR: "Màu sắc",
  MONEY: "Giá"
}

const SEARCH_GROUP = {
  CATEGORY: "Loại sản phẩm",
  PRODUCT: "Sản phẩm"
}

const SORT_GROUP = [
  {
    id: 0,
    name: "Nổi bật nhất"
  },
  {
    id: 1,
    name: "Mới nhất"
  },
  {
    id: 2,
    name: "Giá tăng dần"
  },
  {
    id: 3,
    name: "Giá giảm dần"
  },
]

export { BREAKPOINTS, API_PORT, TOP_PRODUCTS, IMAGE_GROUP, FILTER_GROUP, SEARCH_GROUP, SORT_GROUP };

