import { IUOM } from '@/lib/models/masters/Uom';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface CreateUOMInput {
  code: string;
  name: string;
  status?: 'Active' | 'Inactive';
}

interface UpdateUOMInput {
  _id: string;
  status: 'Active' | 'Inactive';
}

interface IUOMResponse {
  _id: string;
  code: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export const uomApi = createApi({
  reducerPath: 'uomApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  tagTypes: ['UOMs'],
  endpoints: (builder) => ({
    getUOMs: builder.query<IUOMResponse[], void>({
      query: () => '/uom',
      providesTags: ['UOMs'],
    }),
    createUOM: builder.mutation<IUOM, CreateUOMInput>({
      query: (newUOM) => ({
        url: '/uom',
        method: 'POST',
        body: newUOM,
      }),
      invalidatesTags: ['UOMs'],
    }),
    updateUOM: builder.mutation<IUOMResponse, UpdateUOMInput>({
      query: ({ _id, status }) => ({
        url: '/uom',
        method: 'PATCH',
        body: { _id, status },
      }),
      invalidatesTags: ['UOMs']
    }),
  }),
});

export const { useGetUOMsQuery, useCreateUOMMutation,useUpdateUOMMutation } = uomApi;