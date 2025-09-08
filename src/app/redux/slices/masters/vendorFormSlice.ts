/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVendorForm {
  basicInfo: {
    code: string;
    name: string;
    under: string;
    openingBalance: number;
  };
  addressAndContact: {
    contactName: string;
    nameInOL: string;
    address: string;
    phone: string;
    mobile: string;
    email: string;
    web: string;
    fax: string;
  };
  creditAndFinance: {
    creditLimit: number;
    dueDays: number;
    currency: any;
    paymentTerms: string;
    remark: string;
  };
  taxAndCompliance: {
    gstin: string;
    tin: string;
  };
  bankDetails: {
    bankDetails: string;
    accountNo: string;
    bankAddress: string;
  };
  other: {
    company: string;
  };
}

const initialState: IVendorForm = {
  basicInfo: {
    code: '',
    name: '',
    under: '',
    openingBalance: 0,
  },
  addressAndContact: {
    contactName: '',
    nameInOL: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    web: '',
    fax: '',
  },
  creditAndFinance: {
    creditLimit: 0,
    dueDays: 0,
    currency: '',
    paymentTerms: '',
    remark: '',
  },
  taxAndCompliance: {
    gstin: '',
    tin: '',
  },
  bankDetails: {
    bankDetails: '',
    accountNo: '',
    bankAddress: '',
  },
  other: {
    company: '',
  },
};

const vendorFormSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        section: keyof IVendorForm;
        field: string;
        value: string | number;
      }>
    ) => {
      const { section, field, value } = action.payload;
      (state[section] as any)[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = vendorFormSlice.actions;
export default vendorFormSlice.reducer;