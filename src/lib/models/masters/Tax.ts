/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface ITax extends Document {
  name: string;
  code: string;
  description?: string;
  type: "percentage" | "fixed" | "slab";
  rate?: number;
  slabs?: {
    fromAmount: number;
    toAmount: number;
    rate: number;
  }[];
  status: "Active" | "Inactive" | "Draft";
  createdAt: Date;
  updatedAt: Date;
}

const TaxSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed", "slab"],
      required: true,
    },
    rate: {
      type: Number,
      required: function(this: any) {
        return this.type !== "slab";
      },
    },
    slabs: [
      {
        fromAmount: { type: Number, required: true },
        toAmount: { type: Number, required: true },
        rate: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Inactive", "Active", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Tax ||
  mongoose.model<ITax>("Tax", TaxSchema);