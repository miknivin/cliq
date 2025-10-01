/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db/connection';
import { Product } from '@/lib/models/masters/Product';
import UOM from '@/lib/models/masters/Uom';
import VendorModel from '@/lib/models/masters/Vendor';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    UOM
    VendorModel
    Product
    
    // Connect to MongoDB
    await dbConnect();

    // Validate the ID
    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Query the product with population
    const product = await Product.findById(id)
      .populate('basicProductInfo.taxGroup') // Populate Tax model
      .populate('stockAndMeasurement.base') // Populate UOM model
      .populate('stockAndMeasurement.purchase') // Populate UOM model
      .populate('stockAndMeasurement.sales') // Populate UOM model
      .populate('stockAndMeasurement.stock') // Populate UOM model
      .populate('productProperties.categorization.group') // Populate Category model
      .populate('productProperties.categorization.subGroup') // Populate Category model
      .populate('productProperties.categorization.vendor'); // Populate Vendor model

    // Check if product exists
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return the populated product
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}