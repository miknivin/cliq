import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PurchaseOrderItem {
  id: number;
  sno: string;
  code: string;
  ubc: string;
  particulars: string; // ObjectId as string for Product reference
  remark: string;
  warehouse: string;
  uom: string; // ObjectId as string for UOM reference
  frate: string;
  qty: string;
  rate: string;
  foc: string;
  gross: string;
  discountPercent: string;
  discount: string;
  taxPercent: string;
  tax: string;
  total: string;
}

export interface PurchaseOrderState {
  name: string;
  orderDetails: {
    voucherType: string;
    no: string;
    date: string;
    dueDate: string;
    deliveryDate: string;
  };
  vendorInformation: {
    vendor: string; // ObjectId as string for Vendor reference
    address: string;
    attention: string;
  };
  financialDetails: {
    paymentMode: string;
    creditLimit: string;
    currency: string;
    balance: string;
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
    total: string;
    discount: string;
    addition: string;
    advance: string;
    netTotal: string;
  };
  isSubmitted: boolean;
}

const initialState: PurchaseOrderState = {
  name: 'untitled',
  orderDetails: {
    voucherType: 'PH',
    no: '',
    date: '2025-08-14',
    dueDate: '2025-08-14',
    deliveryDate: '2025-08-14',
  },
  vendorInformation: {
    vendor: '', // Stores Vendor._id
    address: '',
    attention: '',
  },
  financialDetails: {
    paymentMode: 'Cash',
    creditLimit: '',
    currency: 'none',
    balance: '',
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
      sno: '',
      code: '',
      ubc: '',
      particulars: '',
      remark: '',
      warehouse: '',
      uom: '',
      frate: '',
      qty: '',
      rate: '',
      foc: '',
      gross: '',
      discountPercent: '',
      discount: '',
      taxPercent: '',
      tax: '',
      total: '',
    },
  ],
  footer: {
    notes: '',
    taxable: false,
    total: '',
    discount: '',
    addition: '',
    advance: '',
    netTotal: '',
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
        value: string | boolean;
      }>
    ) => {
      const { group, field, value } = action.payload;
      if (group === 'name') {
        state.name = value as string;
      } else if (group !== 'items') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state[group] as any)[field!] = value;
      }
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; field: keyof PurchaseOrderItem; value: string }>
    ) => {
      const { id, field, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        (item[field] as string) = value;
      }
    },
    addItem: (state) => {
      const newId = state.items.length + 1;
      state.items.push({
        id: newId,
        sno: '',
        code: '',
        ubc: '',
        particulars: '',
        remark: '',
        warehouse: '',
        uom: '',
        frate: '',
        qty: '',
        rate: '',
        foc: '',
        gross: '',
        discountPercent: '',
        discount: '',
        taxPercent: '',
        tax: '',
        total: '',
      });
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
    submitForm: (state) => {
      for (const item of state.items) {
        if (!item.particulars || !item.uom) {
          throw new Error('Particulars and UOM are required for all items');
        }
      }
      if (!state.vendorInformation.vendor) {
        throw new Error('Vendor is required in vendorInformation');
      }
      state.isSubmitted = true;
      console.log('Form Submitted:', {
        name: state.name,
        orderDetails: state.orderDetails,
        vendorInformation: state.vendorInformation,
        financialDetails: state.financialDetails,
        productInformation: state.productInformation,
        items: state.items,
        footer: state.footer,
      });
    },
  },
});

export const { updateField, updateItem, addItem, removeItem, resetForm, submitForm } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;