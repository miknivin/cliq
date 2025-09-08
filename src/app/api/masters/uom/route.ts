import dbConnect from '@/lib/db/connection';
import UOM from '@/lib/models/masters/Uom';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const uoms = await UOM.find().lean();
    return NextResponse.json(uoms, { status: 200 });
  } catch (error) {
    console.error('Error fetching UOMs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { code, name, status } = body;

    // Validate required fields
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Code and name are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (status && !['Active', 'Inactive'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either Active or Inactive' },
        { status: 400 }
      );
    }

    const newUOM = new UOM({
      code: code.toUpperCase(),
      name,
      status: status || 'Active',
    });

    await newUOM.save();
    return NextResponse.json(newUOM, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating UOM:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'UOM code already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, status } = body;

    // Validate required fields
    if (!_id || !status) {
      return NextResponse.json(
        { error: '_id and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['Active', 'Inactive'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either Active or Inactive' },
        { status: 400 }
      );
    }

    const updatedUOM = await UOM.findByIdAndUpdate(
      _id,
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!updatedUOM) {
      return NextResponse.json(
        { error: 'UOM not found' },
        { status: 404 }
      );
    }

    // Transform Date fields to strings
    const transformedUOM = {
      ...updatedUOM,
      createdAt: (updatedUOM as { createdAt?: Date }).createdAt?.toISOString(),
      updatedAt: (updatedUOM as { updatedAt?: Date }).updatedAt?.toISOString(),
    };

    return NextResponse.json(transformedUOM, { status: 200 });
  } catch (error) {
    console.error('Error updating UOM:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}