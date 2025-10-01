import { NextRequest, NextResponse } from 'next/server';

import mongoose from 'mongoose';
import { Product } from '@/lib/models/masters/Product';
import dbConnect from '@/lib/db/connection';

// GET handler to fetch product by ID, returning only basicProductInfo.name
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await dbConnect()
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Fetch product by ID, selecting only basicProductInfo.name
    const product = await Product.findById(id)
      .select('basicProductInfo.name')

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { name: product.basicProductInfo.name },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}