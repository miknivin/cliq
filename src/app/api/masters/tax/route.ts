/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connection";
import Tax from "@/lib/models/masters/Tax";

// POST /api/taxes -> Create a new tax
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, description, type, rate, slabs, status, code } = body;

    // Validation
    if (!name || !type) {
      return NextResponse.json(
        { success: false, message: "Name and type are required." },
        { status: 400 }
      );
    }


    if (type !== "slab" && (rate === undefined || rate === null)) {
      return NextResponse.json(
        { success: false, message: "Rate is required for percentage or fixed type." },
        { status: 400 }
      );
    }

    if (type === "slab" && (!slabs || slabs.length === 0)) {
      return NextResponse.json(
        { success: false, message: "Slabs are required for slab type." },
        { status: 400 }
      );
    }

    const tax = await Tax.create({
      name,
      description,
      type,
      rate,
      slabs,
      code,
      status: status || "Draft",
    });

    return NextResponse.json(
      { success: true, data: tax },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating tax:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/taxes -> List all taxes
export async function GET() {
  try {
    await dbConnect();

    const taxes = await Tax.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: taxes },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching taxes:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { _id, status } = body;

    // Validation
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Tax ID is required." },
        { status: 400 }
      );
    }

    if (!["Active", "Inactive"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Status must be 'Active' or 'Inactive'." },
        { status: 400 }
      );
    }

    const tax = await Tax.findByIdAndUpdate(
      _id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!tax) {
      return NextResponse.json(
        { success: false, message: "Tax not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: tax },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error updating tax:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}