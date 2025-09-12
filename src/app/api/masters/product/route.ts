/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';
import { validateProductForm } from '@/lib/validators/productValidation';
import { Product } from '@/lib/models/masters/Product';
import dbConnect from '@/lib/db/connection';
import Tax from '@/lib/models/masters/Tax';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data: ProductFormState = await request.json();

    const errors = await validateProductForm(data);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { cost, profitPercentage } = data.pricingAndRates;
    let taxRate = 0;
    if (data.basicProductInfo.taxGroup) {
      const tax = await Tax.findById(data.basicProductInfo.taxGroup);
      if (tax && tax.type === 'percentage') {
        taxRate = tax.rate || 0;
      } else if (tax && tax.type === 'fixed') {
        taxRate = tax.rate || 0;
      } else if (tax && tax.type === 'slab') {
        const slab = tax.slabs?.find((s: { fromAmount: number; toAmount: number; rate: number }) => cost >= s.fromAmount && cost <= s.toAmount);
        taxRate = slab?.rate || 0;
      }
    }

    const sRate = cost * (1 + profitPercentage / 100);
    const wRate = cost * (1 + profitPercentage * 0.5 / 100);
    const nRate = sRate * 0.95;
    const mrp = sRate * (1 + taxRate / 100);

    const updatedData = {
      ...data,
      pricingAndRates: {
        ...data.pricingAndRates,
        sRate,
        wRate,
        nRate,
        mrp,
      },
      productProperties: {
        ...data.productProperties,
        categorization: {
          ...data.productProperties.categorization,
          group: new mongoose.Types.ObjectId(data.productProperties.categorization.group),
          subGroup: new mongoose.Types.ObjectId(data.productProperties.categorization.subGroup),
          vendor: new mongoose.Types.ObjectId(data.productProperties.categorization.vendor.toString()),
        },
      },
    };

    if (updatedData.basicProductInfo.taxGroup) {
      updatedData.basicProductInfo.taxGroup = new mongoose.Types.ObjectId(updatedData.basicProductInfo.taxGroup).toString();
    }
    updatedData.stockAndMeasurement.base = new mongoose.Types.ObjectId(updatedData.stockAndMeasurement.base).toString();
    updatedData.stockAndMeasurement.purchase = new mongoose.Types.ObjectId(updatedData.stockAndMeasurement.purchase).toString();
    updatedData.stockAndMeasurement.sales = new mongoose.Types.ObjectId(updatedData.stockAndMeasurement.sales).toString();
    updatedData.stockAndMeasurement.stock = new mongoose.Types.ObjectId(updatedData.stockAndMeasurement.stock).toString();

    const product = new Product(updatedData);
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
    const products = await Product.find()
      .populate('productProperties.categorization.vendor')
      .lean();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}