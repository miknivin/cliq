import mongoose, { Schema, Document, models } from 'mongoose';

interface BasicProductInfo {
  code: string;
  name: string;
  otherLanguage?: string;
  taxGroup?: mongoose.Types.ObjectId | string;
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
  base: mongoose.Types.ObjectId | string;
  purchase: mongoose.Types.ObjectId | string;
  sales: mongoose.Types.ObjectId | string;
  stock: mongoose.Types.ObjectId | string;
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
    group: mongoose.Types.ObjectId | string;
    subGroup: mongoose.Types.ObjectId | string;
    vendor: mongoose.Types.ObjectId | string;
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
    taxGroup: { type: Schema.Types.ObjectId, ref: 'Tax' },
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
    base: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
    purchase: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
    sales: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
    stock: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
    openingStock: { type: Number, required: true, min: 0 },
    minimumStock: { type: Number, required: true, min: 0 },
    maximumStock: { type: Number, required: true, min: 0 },
    reOrderLevel: { type: Number, required: true, min: 0 },
    reOrderQty: { type: Number, min: 0 },
  },
  productProperties: {
    generalSettings: {
      inactive: { type: Boolean, required: true, default: false },
      lessProfit: { type: Boolean, required: true, default: false },
      counterItem: { type: Boolean, required: true, default: false },
      autoEntry: { type: Boolean, required: true, default: false },
      hideFromDevice: { type: Boolean, required: true, default: false },
      expiry: { type: Number, required: true, min: 0, default: 0 },
      taxInclusive: { type: Boolean, required: true, default: false },
      serialNo: { type: Boolean, required: true, default: false },
    },
    categorization: {
      group: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
      subGroup: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
      vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
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