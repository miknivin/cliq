import mongoose, { Schema, Document, Model, model } from 'mongoose';
import { ICurrency } from './Currency';

// Interface for Basic Info
interface IBasicInfo {
  code: string;
  name: string;
  under: string;
  openingBalance: number;
}

// Interface for Address & Contact
interface IAddressAndContact {
  contactName: string;
  nameInOL: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  web: string;
  fax: string;
}

// Interface for Credit & Finance
interface ICreditAndFinance {
  creditLimit: number;
  dueDays: number;
  currency: ICurrency | mongoose.Types.ObjectId;
  paymentTerms: string;
  remark: string;
}

// Interface for Tax & Compliance
interface ITaxAndCompliance {
  gstin: string;
  tin: string;
}

// Interface for Bank Details
interface IBankDetails {
  bankDetails: string;
  accountNo: string;
  bankAddress: string;
}

// Interface for Other
interface IOther {
  company: string;
}

// Main Vendor interface extending Mongoose Document
export interface IVendor extends Document {
  basicInfo: IBasicInfo;
  addressAndContact: IAddressAndContact;
  creditAndFinance: ICreditAndFinance;
  taxAndCompliance: ITaxAndCompliance;
  bankDetails: IBankDetails;
  other: IOther;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema Definition
const VendorSchema: Schema<IVendor> = new Schema(
  {
    basicInfo: {
      code: { type: String, required: true },
      name: { type: String, required: true },
      under: { type: String, required: false },
      openingBalance: { type: Number, required: false },
    },
    addressAndContact: {
      contactName: { type: String, required: false },
      nameInOL: { type: String, required: false },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      web: { type: String, required: false },
      fax: { type: String, required: false },
    },
    creditAndFinance: {
      creditLimit: { type: Number, required: false },
      dueDays: { type: Number, required: false },
      currency: { type: Schema.Types.ObjectId, ref: 'Currency', required: false },
      paymentTerms: { type: String, required: false },
      remark: { type: String, required: false },
    },
    taxAndCompliance: {
      gstin: { type: String, required: false },
      tin: { type: String, required: false },
    },
    bankDetails: {
      bankDetails: { type: String, required: false },
      accountNo: { type: String, required: false },
      bankAddress: { type: String, required: false },
    },
    other: {
      company: { type: String, required: false },
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create and export the Mongoose model
const VendorModel: Model<IVendor> =
  (mongoose.models.Vendor as Model<IVendor>) || model<IVendor>('Vendor', VendorSchema);

export default VendorModel;