/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { Product } from '@/lib/models/masters/Product';
import dbConnect from '@/lib/db/connection';

import { sampleProducts } from '@/app/data/products';

export async function POST() {
  try {
    await dbConnect();
    
    console.log(sampleProducts.length, 'sample products count');

    // Check if products already exist to avoid duplicates
    const existingProducts = await Product.find({
      'basicProductInfo.code': { $in: sampleProducts.map(p => p.basicProductInfo.code) }
    });

    const existingCodes = existingProducts.map(p => p.basicProductInfo.code);
    const newProducts = sampleProducts.filter(
      p => !existingCodes.includes(p.basicProductInfo.code)
    );

    if (newProducts.length === 0) {
      return NextResponse.json(
        { 
          message: 'All sample products already exist in the database',
          totalSampleProducts: sampleProducts.length,
          existingProducts: existingProducts.length,
          newProductsAdded: 0
        },
        { status: 200 }
      );
    }

    // Insert only new products
    const result = await Product.insertMany(newProducts);

    return NextResponse.json(
      { 
        message: `Added ${result.length} new products successfully`,
        totalSampleProducts: sampleProducts.length,
        existingProducts: existingProducts.length,
        newProductsAdded: result.length,
        insertedProductCodes: result.map(p => p.basicProductInfo.code)
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating products:', error);
    
    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate product code detected', details: error.message },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}