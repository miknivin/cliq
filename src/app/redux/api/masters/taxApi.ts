import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Tax {
  _id?: string;
  code:string;
  name: string;
  description?: string;
  type: "percentage" | "fixed" | "slab";
  rate?: number;
  slabs?: { fromAmount: number; toAmount: number; rate: number }[];
  status: "Active" | "Inactive" | "Draft";
  createdAt?: string;
  updatedAt?: string;
}

export const taxApi = createApi({
  reducerPath: "taxApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/masters" }),
  tagTypes: ["Tax"],
  endpoints: (builder) => ({
    getTaxes: builder.query<{ success: boolean; data: Tax[] }, void>({
      query: () => "/tax",
      providesTags: ["Tax"],
    }),
    createTax: builder.mutation<{ success: boolean; data: Tax }, Partial<Tax>>({
      query: (body) => ({
        url: "/tax",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tax"],
    }),
    changeStatusOfTax: builder.mutation<{ success: boolean; data: Tax }, { _id: string; status: "Active" | "Inactive" }>({
      query: (body) => ({
        url: "/tax",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tax"],
    }),
  }),
});

export const { useGetTaxesQuery, useCreateTaxMutation, useChangeStatusOfTaxMutation } = taxApi;
