import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PurchaseOrderItem {
  id: number; 
  sno: string;
  code: string;
  ubc: string;
  particulars: string; 
  remark: string;
  warehouse: string;
  uom: string;
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
}

export interface PurchaseOrderState {
  name: string;
  orderDetails: {
    voucherType: string;
    no: string;
    date: string;
    dueDate: string; // Changed to string (ISO format)
    deliveryDate: string; // Changed to string (ISO format)
  };
  vendorInformation: {
    vendor: string; // ObjectId as string for Vendor reference
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
  items: PurchaseOrderItem[];
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

export const initialState: PurchaseOrderState = {
  name: 'untitled',
  orderDetails: {
    voucherType: 'PH',
    no: '',
    date: new Date('2025-08-14').toISOString(), // e.g., "2025-08-14T00:00:00.000Z"
    dueDate: new Date('2025-08-14').toISOString(),
    deliveryDate: new Date('2025-08-14').toISOString(),
  },
  vendorInformation: {
    vendor: '',
    address: '',
    attention: '',
  },
  financialDetails: {
    paymentMode: 'Cash',
    creditLimit: 0,
    currency: '',
    balance: 0,
  },
  productInformation: {
    vendorProducts: 'Re-Order Level',
    ownProductsOnly: false,
    reference: 'TELEPHONIC',
    mrNo: '',
  },
  items: [
    {
      id: 1,
      sno: '1',
      code: '',
      ubc: '',
      particulars: '',
      remark: '',
      warehouse: '',
      uom: '',
      frate: 0,
      qty: 1,
      rate: 0,
      foc: 0,
      gross: 0,
      discountPercent: 0,
      discount: 0,
      taxPercent: 0,
      tax: 0,
      total: 0,
    },
  ],
  footer: {
    notes: '',
    taxable: false,
    total: 0,
    discount: 0,
    addition: 0,
    advance: 0,
    netTotal: 0,
  },
  isSubmitted: false,
};

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        group: keyof PurchaseOrderState | 'name';
        field?: string;
        value: string | number | boolean | Date;
      }>
    ) => {
      const { group, field, value } = action.payload;
      if (group === 'name') {
        state.name = value as string;
      } else if (group !== 'items') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = state[group] as any;
        if (field) {
          // Handle Date fields
          if (
            group === 'orderDetails' &&
            ['date', 'dueDate', 'deliveryDate'].includes(field)
          ) {
            // Validate and convert to ISO string
            if (!value || (typeof value !== 'string' && !(value instanceof Date))) {
              target[field] = ''; // Reject invalid values
            } else {
              try {
                target[field] =
                  value instanceof Date
                    ? value.toISOString()
                    : new Date(value as string).toISOString();
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (error) {
                target[field] = ''; // Fallback to empty string for invalid dates
              }
            }
          }
          // Handle number fields
          else if (
            group === 'financialDetails' &&
            ['creditLimit', 'balance'].includes(field)
          ) {
            target[field] = typeof value === 'number' ? value : parseFloat(value as string) || 0;
          }
          // Handle footer number fields
          else if (
            group === 'footer' &&
            ['total', 'discount', 'addition', 'advance', 'netTotal'].includes(field)
          ) {
            target[field] = typeof value === 'number' ? value : parseFloat(value as string) || 0;
          }
          // Handle string and boolean fields
          else {
            target[field] = value;
          }
        }
      }
    },
    updateItem: (
      state,
      action: PayloadAction<{
        id: number;
        field: keyof PurchaseOrderItem;
        value: string | number;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        // Handle number fields
        if (
          [
            'frate',
            'qty',
            'rate',
            'foc',
            'gross',
            'discountPercent',
            'discount',
            'taxPercent',
            'tax',
            'total',
          ].includes(field)
        ) {
          (item[field] as number) = typeof value === 'number' ? value : parseFloat(value as string) || 0;
        }
        // Handle string fields
        else {
          (item[field] as string) = value as string;
        }
      }
    },
    addItem: (state) => {
      const newId = state.items.length + 1;
      state.items.push({
        id: newId,
        sno: `${newId}`,
        code: '',
        ubc: '',
        particulars: '',
        remark: '',
        warehouse: '',
        uom: '',
        frate: 0,
        qty: 1,
        rate: 0,
        foc: 0,
        gross: 0,
        discountPercent: 0,
        discount: 0,
        taxPercent: 0,
        tax: 0,
        total: 0,
      });
    },
    updateFooterTotals: (
      state,
      action: PayloadAction<{
        total: number;
        discount: number;
        netTotal: number;
      }>
    ) => {
      const { total, discount, netTotal } = action.payload;
      state.footer.total = total;
      state.footer.discount = discount;
      state.footer.netTotal = netTotal;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .filter((item) => item.id !== action.payload)
        .map((item, index) => ({
          ...item,
          id: index + 1,
        }));
    },
    resetForm: () => initialState,
  },
});

export const { updateField, updateItem, addItem, removeItem, resetForm, updateFooterTotals } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;