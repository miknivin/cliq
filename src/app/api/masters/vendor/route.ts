import dbConnect from '@/lib/db/connection';
import Currency from '@/lib/models/masters/Currency';
import VendorModel, { IVendor } from '@/lib/models/masters/Vendor';
import { validateVendor } from '@/lib/validators/vendorValidation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all vendors
    const vendors = await VendorModel.find().lean();

    // Transform Date fields to strings
    const transformedVendors = vendors.map(vendor => ({
      ...vendor,
      createdAt: vendor.createdAt.toISOString(),
      updatedAt: vendor.updatedAt.toISOString(),
    }));

    return NextResponse.json({ vendors: transformedVendors }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendors', details: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body
    const data: IVendor & { creditAndFinance: { currency: string } } = await req.json();

    // Validate the vendor data
    const validationError = validateVendor(data, 'backend');
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    // Find currency by code
    const currencyCode = data.creditAndFinance.currency;
    const currency = await Currency.findOne({ code: currencyCode.toUpperCase() });
    if (!currency) {
      return NextResponse.json(
        { error: `Currency with code ${currencyCode} not found` },
        { status: 400 }
      );
    }

    // Create and save the new vendor
    const newVendor = new VendorModel({
      ...data,
      basicInfo: {
        ...data.basicInfo,
        openingBalance: data.basicInfo.openingBalance ? Number(data.basicInfo.openingBalance) : undefined,
      },
      creditAndFinance: {
        ...data.creditAndFinance,
        creditLimit: data.creditAndFinance.creditLimit ? Number(data.creditAndFinance.creditLimit) : undefined,
        dueDays: data.creditAndFinance.dueDays ? Number(data.creditAndFinance.dueDays) : undefined,
        currency: currency._id, // Replace currency code with ObjectId
      },
    });

    await newVendor.save();

    return NextResponse.json(
      { message: 'Vendor created successfully', vendor: newVendor },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to create vendor', details: error.message },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body
    const { _id, status }: { _id: string; status: 'Active' | 'Inactive' } = await req.json();

    // Validate inputs
    if (!_id) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      );
    }
    if (!status || !['Active', 'Inactive'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value', details: 'Status must be Active or Inactive' },
        { status: 400 }
      );
    }

    // Update the vendor
    const updatedVendor = await VendorModel.findByIdAndUpdate(
      _id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
      .populate('creditAndFinance.currency', 'code name symbol')
      .lean();

    if (!updatedVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Vendor updated successfully',
        vendor: {
          ...updatedVendor,
          createdAt: updatedVendor.createdAt.toISOString(),
          updatedAt: updatedVendor.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor', details: error.message },
      { status: 500 }
    );
  }
}