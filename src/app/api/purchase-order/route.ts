/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import PurchaseOrder from '@/lib/models/PurchaseOrder';

import { PurchaseOrderState } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';
import { validatePurchaseOrder, ValidationError } from '@/lib/validators/purchaseOrderValidation';
import dbConnect from '@/lib/db/connection';
import VendorModel from '@/lib/models/masters/Vendor';
import { Product } from '@/lib/models/masters/Product';

export async function POST(request: Request) {
  try {
    const data: PurchaseOrderState = await request.json();

    // Validate request body
    const validationErrors: ValidationError[] = validatePurchaseOrder(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Convert string IDs to ObjectId
    const convertedItems = data.items.map((item) => ({
      ...item,
      particulars: new Types.ObjectId(item.particulars),
      uom: new Types.ObjectId(item.uom),
    }));

    // Create purchase order document
    const purchaseOrder = new PurchaseOrder({
      name: data.name,
      orderDetails: {
        ...data.orderDetails,
        date: new Date(data.orderDetails.date),
        dueDate: new Date(data.orderDetails.dueDate),
        deliveryDate: new Date(data.orderDetails.deliveryDate),
      },
      vendorInformation: {
        ...data.vendorInformation,
        vendor: new Types.ObjectId(data.vendorInformation.vendor),
      },
      financialDetails: data.financialDetails,
      productInformation: data.productInformation,
      items: convertedItems,
      footer: {
        ...data.footer,
        taxable: data.footer.taxable || false,
        total: data.footer.total || 0,
        discount: data.footer.discount || 0,
        addition: data.footer.addition || 0,
        advance: data.footer.advance || 0,
        netTotal: data.footer.netTotal || 0,
      },
    });

    await purchaseOrder.save();

    return NextResponse.json(
      {
        message: 'Purchase order created successfully',
        data: purchaseOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    VendorModel
    Product
    await dbConnect()
    if (keyword) {
      const purchaseOrders = await PurchaseOrder.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in name
          { 'orderDetails.no': { $regex: keyword, $options: 'i' } }, // Case-insensitive search in orderDetails.no
        ],
      })
        .populate('vendorInformation.vendor')
        .sort({ createdAt: -1 });

      return NextResponse.json(
        {
          message: 'Purchase orders retrieved successfully',
          data: purchaseOrders,
        },
        { status: 200 }
      );
    }

    // If no keyword, fetch all purchase orders
    const purchaseOrders = await PurchaseOrder.find()
      .populate('vendorInformation.vendor')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: 'Purchase orders retrieved successfully',
        data: purchaseOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving purchase orders:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}