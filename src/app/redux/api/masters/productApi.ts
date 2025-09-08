import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';

// Interface for a single product, extending ProductFormState with MongoDB fields
export interface Product extends ProductFormState {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
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
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: '/product',
        method: 'GET',
      }),
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

export const { useGetProductsQuery, useCreateProductMutation } = productApi;