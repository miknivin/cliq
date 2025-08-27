import { IVendor } from '@/lib/models/masters/Vendor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from "mongoose";

export type IVendorForm = Omit<IVendor, keyof Document>;

const initialState: IVendorForm = {
  basicInfo: { code: '', name: '', under: '', openingBalance: 0 },
  addressAndContact: { contactName: '', nameInOL: '', address: '', phone: '', mobile: '', email: '', web: '', fax: '' },
  creditAndFinance: { creditLimit: 0, dueDays: 0, currency: '', paymentTerms: '', remark: '' },
  taxAndCompliance: { gstin: '', tin: '' },
  bankDetails: { bankDetails: '', accountNo: '', bankAddress: '' },
  other: { company: '' },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const vendorFormSlice = createSlice({
  name: 'vendorForm',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ section: keyof IVendorForm; field: string; value: string | number }>
    ) => {
      const { section, field, value } = action.payload;
      if (state[section] && typeof state[section] === 'object' && state[section] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state[section] as any)[field] = value;
      }
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = vendorFormSlice.actions;
export default vendorFormSlice.reducer;