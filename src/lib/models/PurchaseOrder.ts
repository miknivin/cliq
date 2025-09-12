import { Schema, model, models, Document, Types } from 'mongoose';

interface IPurchaseOrderItem {
  sno: string;
  code: string;
  ubc: string;
  particulars: Types.ObjectId; // References Product
  remark: string;
  warehouse: string;
  uom: Types.ObjectId; // References UOM
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

interface IPurchaseOrder extends Document {
  name: string;
  orderDetails: {
    voucherType: string;
    no: string;
    date: Date;
    dueDate: Date;
    deliveryDate: Date;
  };
  vendorInformation: {
    vendor: Types.ObjectId; // Changed to reference Vendor
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
  items: IPurchaseOrderItem[];
  footer: {
    notes: string;
    taxable: boolean;
    total: number;
    discount: number;
    addition: number;
    advance: number;
    netTotal: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const purchaseOrderItemSchema = new Schema<IPurchaseOrderItem>({
  sno: { type: String, default: '' },
  code: { type: String, default: '' },
  ubc: { type: String, default: '' },
  particulars: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  remark: { type: String, default: '' },
  warehouse: { type: String, default: '' },
  uom: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
  frate: { type: Number, default: 0 },
  qty: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  foc: { type: Number, default: 0 },
  gross: { type: Number, default: 0 },
  discountPercent: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  taxPercent: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const purchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    name: { type: String, default: 'untitled', unique: true },
    orderDetails: {
      voucherType: { type: String, default: 'PH' },
      no: { type: String, required: true },
      date: { type: Date, default: Date.now },
      dueDate: { type: Date, default: Date.now },
      deliveryDate: { type: Date, default: Date.now },
    },
    vendorInformation: {
      vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Changed to ObjectId
      address: { type: String, default: '' },
      attention: { type: String, default: '' },
    },
    financialDetails: {
      paymentMode: { type: String, default: 'Cash' },
      creditLimit: { type: Number, default: 0 },
      currency: { type: String, default: 'none' },
      balance: { type: Number, default: 0 },
    },
    productInformation: {
      vendorProducts: { type: String, default: 'Re-Order Level' },
      ownProductsOnly: { type: Boolean, default: false },
      reference: { type: String, default: 'TELEPHONIC' },
      mrNo: { type: String, default: '' },
    },
    items: [purchaseOrderItemSchema],
    footer: {
      notes: { type: String, default: '' },
      taxable: { type: Boolean, default: false },
      total: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      addition: { type: Number, default: 0 },
      advance: { type: Number, default: 0 },
      netTotal: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Index for faster name queries
purchaseOrderSchema.index({ name: 1 });

const PurchaseOrder = models.PurchaseOrder || model<IPurchaseOrder>('PurchaseOrder', purchaseOrderSchema);

export default PurchaseOrder;