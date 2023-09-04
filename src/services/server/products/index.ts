import { http } from '@src/services/http';
import { IServerResponse } from '@src/types/services';
import {
  IBodyAddProductBrand,
  IBodyAddProductCategory,
  IResponseProductsBrand,
  IResponseProductsCategory,
  IResponseProducts,
} from './types';
import {
  E_PRODUCTS_BRAND,
  E_PRODUCTS_CATEGORY,
  E_PRODUCTS,
  E_UPDATE_DELETE_PRODUCTS,
} from './endpoint';

export const API_ADD_PRODUCT_CATEGORY = (body: IBodyAddProductCategory) =>
  http.post<
    IBodyAddProductCategory,
    IServerResponse<IResponseProductsCategory[]>
  >(E_PRODUCTS_CATEGORY, body);

export const API_ADD_PRODUCT_BRAND = (body: IBodyAddProductBrand) =>
  http.post<IBodyAddProductBrand, IServerResponse<IResponseProductsBrand[]>>(
    E_PRODUCTS_BRAND,
    body
  );

export const API_ADD_PRODUCT = (body: FormData) =>
  http.post<FormData, IServerResponse<IResponseProducts[]>>(E_PRODUCTS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const API_UPDATE_PRODUCT = (id: string, body: FormData) =>
  http.patch<FormData, IServerResponse<IResponseProducts[]>>(
    E_UPDATE_DELETE_PRODUCTS(id),
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const API_DELETE_PRODUCT = (id: string) =>
  http.delete<FormData, IServerResponse<IResponseProducts[]>>(
    E_UPDATE_DELETE_PRODUCTS(id)
  );
