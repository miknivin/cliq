/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateHeaderHtml(purchaseOrder: any) {
  return `
    <div id="toBeRepeated" class="repeat-header">
      <div class="flex justify-between items-center border-b pb-4 mb-6 print:border-b print:pb-4">
        <div>
          <img src="https://ik.imagekit.io/c1jhxlxiy/logo-placeholder.png?updatedAt=1758099087112" 
               alt="Company Logo" width="150" height="50" class="mb-2 print:mb-2">
          <h1 class="text-2xl font-bold text-gray-900">XYZ Corporation</h1>
          <p class="text-sm text-gray-600">
            456 Business Avenue, Suite 100<br>
            City, Country, ZIP: 12345<br>
            Email: info@xyzcorp.com | Phone: +1-555-987-6543
          </p>
        </div>
        <div class="text-right">
          <h2 class="text-xl font-semibold text-gray-900">Purchase Order</h2>
          <p class="text-sm text-gray-600">
            PO Number: ${purchaseOrder.poNumber}<br>
            Date: ${new Date(purchaseOrder.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900">To:</h3>
        <p class="text-sm text-gray-600">
          ${purchaseOrder.vendor.name}<br>
          ${purchaseOrder.vendor.address}<br>
          ${purchaseOrder.vendor.contact ? `Name: ${purchaseOrder.vendor.contact}<br>` : ""}
          ${purchaseOrder.vendor.phone ? `Phone: ${purchaseOrder.vendor.phone}` : ""}
        </p>
      </div>
    </div>
  `;
}
