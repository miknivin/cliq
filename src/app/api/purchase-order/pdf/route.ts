/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import ejs from "ejs";
import path from "path";
import { promises as fs } from "fs";
import PurchaseOrder from "@/lib/models/PurchaseOrder";
import Currency from "@/lib/models/masters/Currency";
import dbConnect from "@/lib/db/connection";
import puppeteer from "puppeteer";
import { Buffer } from "buffer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const poId = searchParams.get("poId");

  if (!poId) {
    return new NextResponse("Missing poId parameter", { status: 400 });
  }

  try {
    await dbConnect();

    // Fetch the purchase order by ID with population
    const dbPurchaseOrder = await PurchaseOrder.findById(poId)
      .populate("vendorInformation.vendor")
      .populate("items.particulars")
      .populate("items.uom");

    if (!dbPurchaseOrder) {
      return new NextResponse("Purchase Order not found", { status: 404 });
    }

    // Fetch the currency by code
    const currencyCode = dbPurchaseOrder.financialDetails.currency;
    const currency = await Currency.findOne({ code: currencyCode.toUpperCase() });

    if (!currency) {
      return new NextResponse(`Currency with code ${currencyCode} not found`, { status: 404 });
    }

    // Calculate total freight rate
    const totalFrate = dbPurchaseOrder.items
      .reduce((sum: number, item: any) => sum + (item.frate || 0), 0)
      .toFixed(2);

    const footerTax = (
      dbPurchaseOrder.footer.netTotal -
      (dbPurchaseOrder.footer.total - dbPurchaseOrder.footer.discount)
    );

    const totalTax =
    footerTax === 0
    ? dbPurchaseOrder.items
        .reduce((sum: number, item: any) => sum + (item.tax || 0), 0)
        .toFixed(2)
    : footerTax.toFixed(2);

    // Map the schema data to the template format
    const mappedPurchaseOrder = {
      poNumber: dbPurchaseOrder.orderDetails.no,
      date: dbPurchaseOrder.orderDetails.date.toISOString(),
      currency: currency.name || currencyCode,
      vendor: {
        name: dbPurchaseOrder.vendorInformation.vendor?.name || dbPurchaseOrder.name || "Unknown Vendor",
        address: dbPurchaseOrder.vendorInformation.address,
        contact: dbPurchaseOrder.vendorInformation.attention,
        phone: dbPurchaseOrder.vendorInformation.vendor?.phone || "",
      },
      items: dbPurchaseOrder.items.map((item: any) => ({
        sno: item.sno,
        code: item.code,
        particulars: item.particulars?.basicProductInfo.name || item.particulars || "Unknown Product",
        qty: item.qty.toString(),
        rate: item.rate.toFixed(2),
        frate: item.frate.toFixed(2),
        discount: item.discount.toFixed(2),
        tax: item.tax.toFixed(2),
        total: item.total.toFixed(2),
      })),
      totals: {
        gross: dbPurchaseOrder.footer.total.toFixed(2),
        discount: dbPurchaseOrder.footer.discount.toFixed(2),
        tax: totalTax,
        frate: totalFrate,
        total: dbPurchaseOrder.footer.netTotal.toFixed(2),
      },
    };

    const currencySymbol = currency.symbol || "$";

    // Render EJS to HTML string
    const templatePath = path.join(process.cwd(), "templates", "purchase-order.ejs");
    const template = await fs.readFile(templatePath, "utf-8");
    let html = await ejs.render(template, { purchaseOrder: mappedPurchaseOrder, currencySymbol }, { async: true });

    // Read the CSS file
    const cssPath = path.join(process.cwd(), "public", "purchase-order.css");
    let cssContent;
    try {
      cssContent = await fs.readFile(cssPath, "utf-8");
    } catch (cssError) {
      console.error("Error reading CSS file:", cssError);
      throw new Error("Failed to load stylesheet");
    }

    // Manually inject CSS into the HTML
    html = html.replace('</head>', `<style>${cssContent}</style></head>`);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-logging", "--v=1"]
    });
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: `
      <div style="font-size:10px; width:100%; text-align:center; color:#666;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
      headerTemplate: '<div></div>',
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });
    await browser.close();

    // Encode PDF buffer to base64
    const base64Pdf = Buffer.from(pdfBuffer).toString("base64");

    // Return base64 PDF as JSON response
    return new NextResponse(JSON.stringify({ pdf: base64Pdf, filename: `purchase-order-${poId}.pdf` }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}