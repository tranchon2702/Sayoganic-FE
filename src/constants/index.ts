
export const SITE_CONFIG = {
  name: "Sayoganic365 ",
  tagline: "Thực phẩm sạch từ thiên nhiên",
  phone: "0869415919 - 08651800039",
  email: "sayoganic365@gmail.com",
  address: "Thôn 6 Xã phúc Thọ Lâm Hà Lâm Đồng, Ấp Tân Hà, Vietnam",
  freeShippingThreshold: 500000,
};

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product",
  ABOUT: "/about",
  CONTACT: "/contact",
  CART: "/cart",
  NEWS: "/news",
  NEWS_DETAIL: "/news",
  CUSTOMER_SERVICE: "/customer-service",
} as const;

export const PRODUCT_CATEGORIES = [
  { name: "Cà phê", path: "/products/coffee" },
  { name: "Chè", path: "/products/tea" },
  { name: "Gia vị", path: "/products/spices" },
  { name: "Nấm khô", path: "/products/mushrooms" },
  { name: "Hạt dinh dưỡng", path: "/products/nuts" },
  { name: "Mật ong", path: "/products/honey" },
];

export const ANIMATION_DELAYS = {
  SLIDE_INTERVAL: 5000,
  STAGGER_DELAY: 0.1,
};
