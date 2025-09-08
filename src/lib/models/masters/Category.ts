import { Schema, model, models, Document } from 'mongoose';

export interface ICategory extends Document {
  code: string;
  name: string;
  parentCategory?: string;
  status: 'Active' | 'Inactive';
}

const categorySchema = new Schema<ICategory>({
  code: {
    type: String,
    required: [true, 'Category code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    minlength: [3, 'Category code must be at least 5 characters'],
    maxlength: [10, 'Category code cannot exceed 10 characters'],
  },
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    minlength: [3, 'Category name must be at least 3 characters'],
    maxlength: [50, 'Category name cannot exceed 50 characters'],
  },
  parentCategory: {
    type: String,
    trim: true,
    default: null,
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

const Category = models.Category || model<ICategory>('Category', categorySchema);

export default Category;