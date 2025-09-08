/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';
import { validateProductForm } from '@/lib/validators/productValidation';
import { Product } from '@/lib/models/masters/Product';
import dbConnect from '@/lib/db/connection';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    dbConnect()

    const data: ProductFormState = await request.json();

    // Validate form data
    const errors = validateProductForm(data);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Save to MongoDB
    const product = new Product(data);
    const savedProduct = await product.save();

    return NextResponse.json({ message: 'Product created successfully', data: savedProduct }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().lean();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}