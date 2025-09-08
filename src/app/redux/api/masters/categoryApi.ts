import { ICategory } from '@/lib/models/masters/Category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CreateCategoryInput {
  code: string;
  name: string;
  parentCategory?: string;
  status?: 'Active' | 'Inactive';
}

interface UpdateCategoryInput {
  _id: string;
  status: 'Active' | 'Inactive';
}

interface ICategoryResponse {
  _id: string;
  code: string;
  name: string;
  parentCategory?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoryResponse[] , void>({
      query: () => '/category',
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<ICategory, CreateCategoryInput>({
      query: (newCategory) => ({
        url: '/category',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<ICategory, UpdateCategoryInput>({
      query: ({ _id, status }) => ({
        url: '/category',
        method: 'PATCH',
        body: { _id, status },
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApi;