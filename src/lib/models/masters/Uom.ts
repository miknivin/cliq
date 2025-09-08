import { Schema, model, models, Document } from 'mongoose';

export interface IUOMWithDoc extends Document {
  code: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface IUOM {
  code: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

const uomSchema = new Schema<IUOMWithDoc>({
  code: {
    type: String,
    required: [true, 'UOM code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    minlength: [1, 'UOM code must be at least 1 character'],
    maxlength: [10, 'UOM code cannot exceed 10 characters'],
  },
  name: {
    type: String,
    required: [true, 'UOM name is required'],
    trim: true,
    minlength: [2, 'UOM name must be at least 2 characters'],
    maxlength: [50, 'UOM name cannot exceed 50 characters'],
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

const UOM = models.UOM || model<IUOM>('UOM', uomSchema);

export default UOM;