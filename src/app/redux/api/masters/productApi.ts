import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';

// Interface for a single product, extending ProductFormState with MongoDB fields
export interface Product extends ProductFormState {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductLiteResponse {
  name: string;
}
// Interface for the GET response
interface GetProductsResponse {
  success: boolean;
  data: Product[];
}

// Interface for the POST response
interface CreateProductResponse {
  message: string;
  data: ProductFormState;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: '/product',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    getProductLite: builder.query<ProductLiteResponse, string>({
      query: (id) => ({
        url: `/product/${id}/lite`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<CreateProductResponse, ProductFormState>({
      query: (data) => ({
        url: '/product',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useGetProductLiteQuery } = productApi;