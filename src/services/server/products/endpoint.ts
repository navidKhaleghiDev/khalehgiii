import { IPagination } from '@src/types/services';

export const E_PRODUCTS = '/products/';
export const E_PRODUCTS_CATEGORY = '/products/category/';
export const E_PRODUCTS_BRAND = '/products/brand/';

export const E_PRODUCTS_LIST = ({ pageSize, page, filter }: IPagination) =>
  `/products/${filter ? `${filter}&` : '?'}page_size=${pageSize}&page=${page}`;

export const E_UPDATE_DELETE_PRODUCTS = (id: string) => `/products/${id}/`;

export const E_SERVER_PRODUCT_DEVICE_RETRIEVE = (id: string) =>
  `/products/device/${id}/`;
