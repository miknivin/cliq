import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import Currency from '@/lib/models/masters/Currency';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Extract code and searchTerm from query parameters
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const searchTerm = searchParams.get('searchTerm');

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    // If code is provided, prioritize exact match
    if (code) {
      query.code = code.toUpperCase(); // Ensure code is uppercase to match schema
    } else if (searchTerm) {
      // Fallback to searchTerm logic if no code is provided
      query.$or = [
        { code: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex search on code
        { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex search on name
        { symbol: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex search on symbol
      ];
    }

    // Fetch currencies with the constructed query
    const currencies = await Currency.find(query).lean();

    // Transform Date fields to strings
    const transformedCurrencies = currencies.map(currency => ({
      ...currency,
      createdAt: currency.createdAt.toISOString(),
      updatedAt: currency.updatedAt.toISOString(),
    }));

    return NextResponse.json(transformedCurrencies, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { code, name, symbol, status } = body;

    // Validate required fields
    if (!code || !name || !symbol) {
      return NextResponse.json(
        { error: 'Code, name, and symbol are required' },
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

    const newCurrency = new Currency({
      code: code.toUpperCase(),
      name,
      symbol,
      status: status || 'Active',
    });

    await newCurrency.save();
    return NextResponse.json(newCurrency, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating currency:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Currency code already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}