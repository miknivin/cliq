/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVendor } from '@/lib/models/masters/Vendor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasicProductInfo {
  code: string;
  name: string;
  otherLanguage?: string;
  taxGroup: string;
}

export interface PricingAndRates {
  profitPercentage: number;
  pRate: number;
  cost: number;
  sRate: number;
  nRate: number;
  mrp: number;
  wRate: number;
}

export interface StockAndMeasurement {
  base: string;
  purchase: string;
  sales: string;
  stock: string;
  openingStock: number;
  minimumStock: number;
  maximumStock: number;
  reOrderLevel: number;
  reOrderQty?: number;
}

export interface GeneralSettings {
  inactive: boolean;
  lessProfit: boolean;
  counterItem: boolean;
  autoEntry: boolean;
  hideFromDevice: boolean;
  expiry: number;
  taxInclusive: boolean;
  serialNo: boolean;
}

export interface Categorization {
  group: string;
  subGroup: string;
  vendor: string  | IVendor;
  brand: string;
}

export interface AdditionalDetails {
  packUnit: number;
  additionPercentage: number;
  addition: number;
  company?: string;
  whStock?: string;
}

export interface ProductFormState {
  _id?:any;
  basicProductInfo: BasicProductInfo;
  pricingAndRates: PricingAndRates;
  stockAndMeasurement: StockAndMeasurement;
  productProperties: {
    generalSettings: GeneralSettings;
    categorization: Categorization;
  };
  additionalDetails: AdditionalDetails;
}

const initialState: ProductFormState = {
  basicProductInfo: { code: '', name: '', otherLanguage: '', taxGroup: '' },
  pricingAndRates: { profitPercentage: 0, pRate: 0, cost: 0, sRate: 0, nRate: 0, mrp: 0, wRate: 0 },
  stockAndMeasurement: { base: '', purchase: '', sales: '', stock: '', openingStock: 0, minimumStock: 0, maximumStock: 0, reOrderLevel: 0, reOrderQty: 0 },
  productProperties: {
    generalSettings: { inactive: false, lessProfit: false, counterItem: false, autoEntry: false, hideFromDevice: false, expiry: 0, taxInclusive: false, serialNo: false },
    categorization: { group: '', subGroup: '', vendor: '', brand: '' },
  },
  additionalDetails: { packUnit: 0, additionPercentage: 0, addition: 0, company: '', whStock: '' },
};

const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        section: keyof ProductFormState;
        field: string;
        value: string | number | boolean;
      }>
    ) => {
      const { section, field, value } = action.payload;
      if (section === 'productProperties' && field.includes('.')) {
        const [subSection, subField] = field.split('.');
        if (subSection === 'generalSettings') {
          (state.productProperties.generalSettings as any)[subField] = value;
        } else if (subSection === 'categorization') {
          // Ensure categorization fields are always strings, default to '' if invalid
          state.productProperties.categorization[subField as keyof Categorization] = typeof value === 'string' && value !== 'undefined' && value !== 'null' ? value : '';
        }
      } else {
        (state[section] as any)[field] = value;
      }
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = productFormSlice.actions;
export default productFormSlice.reducer;