import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("Access to EJS template is forbidden", { status: 403 });
}