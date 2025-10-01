/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import PurchaseOrder from '@/lib/models/PurchaseOrder';
import Vendor from '@/lib/models/masters/Vendor';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Extract vendorId and netTotal from query parameters
    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get('vendorId');
    const netTotal = parseFloat(searchParams.get('netTotal') || '0');

    console.log(vendorId,'vendorid');


    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      );
    }

    // Fetch the vendor to get the credit limit
    const vendor = await Vendor.findById(vendorId).lean();
    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }
    const creditLimit = vendor.creditAndFinance?.creditLimit || 0;

    const purchaseOrders = await PurchaseOrder.find({
      'vendorInformation.vendor': vendorId,
    }).lean();

    const totalNetAmountFromPOs = purchaseOrders.reduce(
      (sum, po) => sum + (po.footer?.netTotal || 0),
      0
    );

    const totalNetAmount = totalNetAmountFromPOs + netTotal;

    if (totalNetAmount > creditLimit) {
      return NextResponse.json(
        {
          error: 'Total net amount of purchase orders (including current) exceeds the credit limit',
          totalNetAmount,
          creditLimit,
        },
        { status: 400 }
      );
    }

    // Calculate the balance
    const balance = creditLimit - totalNetAmount;

    return NextResponse.json(
      {
        message: 'Balance calculated successfully',
        totalNetAmount,
        creditLimit,
        balance,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching purchase orders for vendor:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}