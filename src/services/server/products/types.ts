// export interface IServerProducts {
//   id: string;
//   brand?: {
//     id: string;
//     name: string;
//     created_at: string;
//     updated_at: string;
//   };
//   category?: {
//     id: string;
//     name: string;
//     created_at: string;
//     updated_at: string;
//   };
//   image: string;
//   model: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
// }
export interface IResponseProducts {
  id?: string;
  brand: {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
  category: {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  creator: {
    id?: string;
    created_by?: string;
    email: string;
    last_login?: string;
    phone_number?: string;
    username?: string;
  };
}

export interface IResponseProductsCategory {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}
export interface IBodyAddProductCategory {
  name: string;
}

export type IResponseProductsBrand = IResponseProductsCategory;
export type IBodyAddProductBrand = IBodyAddProductCategory;

export interface IBodyAddProduct {
  name: string;
  brand: string;
  category: string;
  description: string;
  image: File | string;
}

export interface IBodyUpdateProduct extends IBodyAddProduct {
  id: string;
}
