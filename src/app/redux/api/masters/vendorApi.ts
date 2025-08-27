import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IVendorForm } from '../../slices/masters/vendorFormSlice';

interface VendorResponse {
  message: string;
  vendor?: IVendorForm;
}

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/masters' }),
  endpoints: (builder) => ({
    createVendor: builder.mutation<VendorResponse, IVendorForm>({
      query: (vendorData) => ({
        url: '/vendor',
        method: 'POST',
        body: vendorData,
      }),
    }),
  }),
});

export const { useCreateVendorMutation } = vendorApi;