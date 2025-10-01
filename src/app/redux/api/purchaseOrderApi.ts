import { IPurchaseOrder } from '@/lib/models/PurchaseOrder';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interface for incoming data (strings for ObjectIds from frontend)
interface PurchaseOrderData {
  name: string;
  orderDetails: {
    voucherType: string;
    no: string;
    date: string;
    dueDate: string;
    deliveryDate: string;
  };
  vendorInformation: {
    vendor: string; // ObjectId as string
    address: string;
    attention: string;
  };
  financialDetails: {
    paymentMode: string;
    creditLimit: number;
    currency: string;
    balance: number;
  };
  productInformation: {
    vendorProducts: string;
    ownProductsOnly: boolean;
    reference: string;
    mrNo: string;
  };
  items: Array<{
    sno: string;
    code: string;
    ubc: string;
    particulars: string; // ObjectId as string
    remark: string;
    warehouse: string;
    uom: string; // ObjectId as string
    frate: number;
    qty: number;
    rate: number;
    foc: number;
    gross: number;
    discountPercent: number;
    discount: number;
    taxPercent: number;
    tax: number;
    total: number;
  }>;
  footer: {
    notes: string;
    taxable: boolean;
    total: number;
    discount: number;
    addition: number;
    advance: number;
    netTotal: number;
  };
  isSubmitted?: boolean;
}

// API response types
interface CreatePurchaseOrderResponse {
  message: string;
  data: IPurchaseOrder;
}

interface GetPurchaseOrdersResponse {
  message: string;
  data: IPurchaseOrder[];
}

// New interface for PDF response
interface GetPurchaseOrderPDFResponse {
  pdf: string; // Base64-encoded PDF string
  filename: string; // Suggested filename
}

export const purchaseOrderApi = createApi({
  reducerPath: 'purchaseOrderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createPurchaseOrder: builder.mutation<CreatePurchaseOrderResponse, PurchaseOrderData>({
      query: (purchaseOrder) => ({
        url: '/purchase-order',
        method: 'POST',
        body: purchaseOrder,
      }),
    }),
    getPurchaseOrders: builder.query<GetPurchaseOrdersResponse, { keyword?: string }>({
      query: ({ keyword }) => ({
        url: '/purchase-order',
        method: 'GET',
        params: keyword ? { keyword } : undefined,
      }),
    }),
    getPurchaseOrderPDF: builder.query<GetPurchaseOrderPDFResponse, { poId: string }>({
      query: ({ poId }) => ({
        url: `/purchase-order/pdf`,
        method: 'GET',
        params: { poId },
      }),
    }),
  }),
});

export const { useCreatePurchaseOrderMutation, useGetPurchaseOrdersQuery, useGetPurchaseOrderPDFQuery } = purchaseOrderApi;