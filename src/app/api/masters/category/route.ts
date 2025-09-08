import dbConnect from '@/lib/db/connection';
import Category from '@/lib/models/masters/Category';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().lean();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
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
    
    const { code, name, parentCategory, status } = body;

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

    const newCategory = new Category({
      code: code.toUpperCase(),
      name,
      parentCategory: parentCategory || null,
      status: status || 'Active',
    });

    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category code already exists' },
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

    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!updatedCategory || Array.isArray(updatedCategory)) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }


    const transformedCategory = {
      ...updatedCategory,
      createdAt: updatedCategory.createdAt
        ? new Date(updatedCategory.createdAt).toISOString()
        : null,
      updatedAt: updatedCategory.updatedAt
        ? new Date(updatedCategory.updatedAt).toISOString()
        : null,
    };

    return NextResponse.json(transformedCategory, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}