import { ICurrency } from '@/lib/models/masters/Currency';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CreateCurrencyInput {
  code: string;
  name: string;
  symbol: string;
  status?: 'Active' | 'Inactive';
}

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  tagTypes: ['Currencies'],
  endpoints: (builder) => ({
    getCurrencies: builder.query<ICurrency[], { searchTerm?: string }>({
      query: ({ searchTerm }) => ({
        url: '/currency',
        params: searchTerm ? { searchTerm } : undefined,
      }),
      providesTags: ['Currencies'],
    }),
    createCurrency: builder.mutation<ICurrency, CreateCurrencyInput>({
      query: (newCurrency) => ({
        url: '/currency',
        method: 'POST',
        body: newCurrency,
      }),
      invalidatesTags: ['Currencies'],
    }),
  }),
});

export const { useGetCurrenciesQuery, useCreateCurrencyMutation } = currencyApi;