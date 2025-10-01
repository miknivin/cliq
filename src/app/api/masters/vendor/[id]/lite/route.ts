import { NextRequest, NextResponse } from 'next/server';

import mongoose from 'mongoose';
import VendorModel from '@/lib/models/masters/Vendor';

// GET handler to fetch vendor by ID, returning only basicInfo.name
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    // Fetch vendor by ID, selecting only basicInfo.name
    const vendor = await VendorModel.findById(id)
      .select('basicInfo.name')
      .lean();

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { name: vendor.basicInfo.name },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}