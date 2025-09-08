import { Schema, model, models, Document } from 'mongoose';

export interface ICurrency extends Document {
  code: string;
  name: string;
  symbol: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

const currencySchema = new Schema<ICurrency>({
  code: {
    type: String,
    required: [true, 'Currency code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    minlength: [2, 'Currency code must be at least 2 characters'],
  },
  name: {
    type: String,
    required: [true, 'Currency name is required'],
    trim: true,
    minlength: [3, 'Currency name must be at least 3 characters'],
    maxlength: [50, 'Currency name cannot exceed 50 characters'],
  },
  symbol: {
    type: String,
    required: [true, 'Currency symbol is required'],
    trim: true,
    maxlength: [5, 'Currency symbol cannot exceed 5 characters'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['Active', 'Inactive'],
      message: 'Status must be either Active or Inactive',
    },
    default: 'Active',
  },
}, {
  timestamps: true,
});

const Currency = models.Currency || model<ICurrency>('Currency', currencySchema);

export default Currency;