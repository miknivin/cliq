/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';

interface PurchaseOrderItem {
  sno: string;
  code: string;
  particulars: string;
  qty: string;
  rate: string;
  frate: string;
  discount: string;
  tax: string;
  total: string;
}

interface PurchaseOrder {
  poNumber: string;
  date: string;
  currency: string;
  vendor: {
    name: string;
    address: string;
    contact: string;
    phone: string;
  };
  items: PurchaseOrderItem[];
  totals: {
    gross: string;
    discount: string;
    tax: string;
    frate: string;
    total: string;
  };
}

interface PurchaseOrderPageProps {
  purchaseOrder: PurchaseOrder;
  isSubmitted?:boolean;
}

const PurchaseOrderPage: React.FC<PurchaseOrderPageProps> = ({ purchaseOrder, isSubmitted=false }) => {
  // Memoize currency symbol extraction to avoid recomputation on every render
const currencySymbol = purchaseOrder?.currency
    ? purchaseOrder.currency.match(/\(([^)]+)\)/)?.[1] || purchaseOrder.currency
    : '$';

  return (
    <div id='printSpace' className="bg-gray-100 p-4 dark:bg-gray-900 print:bg-white max-h-[95vh]">
      <div  className="w-[794px] mx-auto bg-white  shadow-lg rounded-lg p-6 print:shadow-none print:rounded-none print:w-[794px]">
        {/* Letterhead */}
        <div id='toBeRepeated'>
          <div className="flex justify-between items-center border-b pb-4 mb-6 print:border-b print:pb-4">
            <div>
              <Image
                src="https://ik.imagekit.io/c1jhxlxiy/logo-placeholder.png?updatedAt=1758099087112"
                alt="Company Logo"
                width={150}
                height={50}
                className="mb-2 print:mb-2"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                XYZ Corporation
              </h1>
              <p className="text-sm text-gray-600">
                456 Business Avenue, Suite 100<br />
                City, Country, ZIP: 12345<br />
                Email: info@xyzcorp.com | Phone: +1-555-987-6543
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-gray-900">
                Purchase Order
              </h2>
              <p className="text-sm text-gray-600">
                PO Number: {purchaseOrder.poNumber}<br />
                Date: {new Date(purchaseOrder.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Vendor Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              To:
            </h3>
            <p className="text-sm text-gray-600">
              {purchaseOrder.vendor.name}<br />
              {purchaseOrder.vendor.address}<br />
              {purchaseOrder.vendor.contact && `Name: ${purchaseOrder.vendor.contact}`}<br />
              {purchaseOrder.vendor.phone && `Phone: ${purchaseOrder.vendor.phone}`}
            </p>
          </div>
        </div>
        {/* Purchase Order Table */}
        <div className="overflow-x-auto print:overflow-x-visible">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  S.No
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Code
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Particulars
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Qty
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Rate
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  F.Rate
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Discount
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Tax
                </th>
                <th className="p-2 text-left text-sm font-semibold text-gray-900 border">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrder.items.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200"
                >
                  <td className="p-2 text-sm text-gray-900 border">
                    {item.sno}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {item.code}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {item.particulars}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {item.qty}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {currencySymbol}{item.rate}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {currencySymbol}{item.frate}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {currencySymbol}{item.discount}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {currencySymbol}{item.tax}
                  </td>
                  <td className="p-2 text-sm text-gray-900 border">
                    {currencySymbol}{item.total}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan={6}
                  className="p-2 text-sm text-gray-900 border"
                >
                  Total
                </td>
                <td className="p-2 text-sm text-gray-900 border">
                  {currencySymbol}{purchaseOrder.totals.discount}
                </td>
                <td className="p-2 text-sm text-gray-900 border">
                  {currencySymbol}{purchaseOrder.totals.tax}
                </td>
                <td className="p-2 text-sm text-gray-900 border">
                  {currencySymbol}{purchaseOrder.totals.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Terms and Conditions
          </h3>
          <p className="text-sm text-gray-600">
            1. Payment due within 30 days of invoice date.<br />
            2. All goods remain the property of XYZ Corporation until fully paid.<br />
            3. Freight charges are included as specified.
          </p>
        </div>

        {/* Action Buttons */}
        {/* {isSubmitted&&(
          <div className="mt-6 flex justify-end gap-4">
            <PrintButton />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PurchaseOrderPage;