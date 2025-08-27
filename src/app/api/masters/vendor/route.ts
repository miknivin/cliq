import dbConnect from '@/lib/db/connection';
import VendorModel, { IVendor } from '@/lib/models/masters/Vendor';
import { validateVendor } from '@/lib/validators/vendorValidation';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body
    const data: IVendor = await req.json();

    // Validate the vendor data
    const validationError = validateVendor(data,'backend');
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
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