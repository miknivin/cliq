
import mongoose, { Schema, Document, models } from 'mongoose';

interface BasicProductInfo {
  code: string;
  name: string;
  otherLanguage?: string;
  taxGroup?: string;
}

interface PricingAndRates {
  profitPercentage: number;
  pRate: number;
  cost: number;
  sRate: number;
  nRate: number;
  mrp: number;
  wRate: number;
}

interface StockAndMeasurement {
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

interface ProductProperties {
  generalSettings: {
    inactive: boolean;
    lessProfit: boolean;
    counterItem: boolean;
    autoEntry: boolean;
    hideFromDevice: boolean;
    expiry: number;
    taxInclusive: boolean;
    serialNo: boolean;
  };
  categorization: {
    group: string;
    subGroup: string;
    vendor: string;
    brand: string;
  };
}

interface AdditionalDetails {
  packUnit: number;
  additionPercentage: number;
  addition: number;
  company?: string;
  whStock?: string;
  document?: string;
  barcode?: string;
  barcodeMultiple?: string[];
  purchaseHistory?: string;
  salesHistory?: string;
  companyStock?: string;
}

interface ProductDoc extends Document {
  basicProductInfo: BasicProductInfo;
  pricingAndRates: PricingAndRates;
  stockAndMeasurement: StockAndMeasurement;
  productProperties: ProductProperties;
  additionalDetails: AdditionalDetails;
}

const productSchema = new Schema<ProductDoc>({
  basicProductInfo: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    otherLanguage: { type: String },
    taxGroup: { type: String },
  },
  pricingAndRates: {
    profitPercentage: { type: Number, required: true, min: 0 },
    pRate: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 },
    sRate: { type: Number, required: true, min: 0 },
    nRate: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    wRate: { type: Number, required: true, min: 0 },
  },
  stockAndMeasurement: {
    base: { type: String, required: true },
    purchase: { type: String, required: true },
    sales: { type: String, required: true },
    stock: { type: String, required: true },
    openingStock: { type: Number, required: true, min: 0 },
    minimumStock: { type: Number, required: true, min: 0 },
    maximumStock: { type: Number, required: true, min: 0 },
    reOrderLevel: { type: Number, required: true, min: 0 },
    reOrderQty: { type: Number,min:0 },
  },
  productProperties: {
    generalSettings: {
      inactive: { type: Boolean, required: true },
      lessProfit: { type: Boolean, required: true },
      counterItem: { type: Boolean, required: true },
      autoEntry: { type: Boolean, required: true },
      hideFromDevice: { type: Boolean, required: true },
      expiry: { type: Number, required: true, min: 0 },
      taxInclusive: { type: Boolean, required: true },
      serialNo: { type: Boolean, required: true },
    },
    categorization: {
      group: { type: String, required: true },
      subGroup: { type: String, required: true },
      vendor: { type: String, required: true },
      brand: { type: String, required: true },
    },
  },
  additionalDetails: {
    packUnit: { type: Number, required: true, min: 0 },
    additionPercentage: { type: Number, required: true, min: 0 },
    addition: { type: Number, required: true, min: 0 },
    company: { type: String },
    whStock: { type: String },
    document: { type: String },
    barcode: { type: String },
    barcodeMultiple: { type: [String] },
    purchaseHistory: { type: String },
    salesHistory: { type: String },
    companyStock: { type: String },
  },
});

const Product = models.Product || mongoose.model<ProductDoc>('Product', productSchema);

export { Product };
export type { BasicProductInfo, PricingAndRates, StockAndMeasurement, ProductProperties, AdditionalDetails };