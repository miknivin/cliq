import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IVendorForm } from '@/app/redux/slices/masters/vendorFormSlice';

// Define a response interface with serializable fields
export interface VendorResponse {
  message: string;
  vendor?: {
    _id: string;
    basicInfo: {
      code: string;
      name: string;
      under?: string;
      openingBalance?: number;
    };
    addressAndContact: {
      contactName?: string;
      nameInOL?: string;
      address: string;
      phone: string;
      email: string;
      web?: string;
      fax?: string;
    };
    creditAndFinance: {
      creditLimit?: number;
      dueDays?: number;
      currency?: string; // Assuming populated as code (e.g., "INR")
      paymentTerms?: string;
      remark?: string;
    };
    taxAndCompliance: {
      gstin?: string;
      tin?: string;
    };
    bankDetails: {
      bankDetails?: string;
      accountNo?: string;
      bankAddress?: string;
    };
    other: {
      company?: string;
    };
    status?: 'Active' | 'Inactive';
    createdAt: string;
    updatedAt: string;
  };
}

export interface VendorListResponse {
  vendors: VendorResponse['vendor'][];
}

export interface VendorLiteResponse {
  name: string;
}

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  tagTypes: ['Vendors'],
  endpoints: (builder) => ({
    createVendor: builder.mutation<VendorResponse, IVendorForm>({
      query: (vendorData) => ({
        url: '/vendor',
        method: 'POST',
        body: vendorData,
      }),
      transformResponse: (response: VendorResponse) => {
        if (response.vendor) {
          return {
            ...response,
            vendor: {
              ...response.vendor,
              createdAt: new Date(response.vendor.createdAt).toISOString(),
              updatedAt: new Date(response.vendor.updatedAt).toISOString(),
            },
          };
        }
        return response;
      },
      invalidatesTags: ['Vendors'],
    }),
    getVendors: builder.query<VendorListResponse, { searchTerm?: string }>({
      query: ({ searchTerm }) => ({
        url: '/vendor',
        params: searchTerm ? { searchTerm } : undefined,
      }),
      providesTags: ['Vendors'],
    }),
    updateVendorStatus: builder.mutation<VendorResponse, { _id: string; status: 'Active' | 'Inactive' }>({
      query: ({ _id, status }) => ({
        url: '/vendor',
        method: 'PATCH',
        body: { _id, status },
      }),
      transformResponse: (response: VendorResponse) => {
        if (response.vendor) {
          return {
            ...response,
            vendor: {
              ...response.vendor,
              createdAt: new Date(response.vendor.createdAt).toISOString(),
              updatedAt: new Date(response.vendor.updatedAt).toISOString(),
            },
          };
        }
        return response;
      },
      invalidatesTags: ['Vendors'],
    }),
    getVendorLite: builder.query<VendorLiteResponse, string>({
      query: (id) => ({
        url: `/vendor/${id}/lite`,
      }),
      providesTags: (result, error, id) => [{ type: 'Vendors', id }],
    }),
  }),
});

export const { useCreateVendorMutation, useGetVendorsQuery, useUpdateVendorStatusMutation, useGetVendorLiteQuery } = vendorApi;