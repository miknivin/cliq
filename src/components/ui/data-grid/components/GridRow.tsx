/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/app/redux/api/masters/productApi";
import { IUOMResponse } from "@/app/redux/api/masters/uomApi";
import { Column } from "../GridComponent";
import Autocomplete from "../../auto-complete/CustomAutocomplete";

// Define Tax interface locally for populated taxGroup
interface Tax {
  _id: string;
  rate: number; // The tax rate (e.g., 5 for 5%)
  name?: string; // Optional: Tax group name (e.g., "GST 5%")
  description?: string; // Optional: Description of the tax group
  isActive?: boolean; // Optional: Whether the tax group is active
  [key: string]: any; // Allow additional properties from populated Tax document
}

interface GridRowProps<T> {
  row: T;
  columns: Column[];
  visibleColumns: string[];
  columnWidths: { [key: string]: number };
  onRowUpdate: (id: number, field: keyof T, value: string) => void;
  onRowDelete: (id: number) => void;
  products: Product[];
  uoms: IUOMResponse[];
  isProductsLoading: boolean;
  isUOMsLoading: boolean;
  gridTemplateColumns: string;
  rowsLength: number;
}

export default function GridRow<T extends { id: number }>({
  row,
  columns,
  visibleColumns,
  onRowUpdate,
  onRowDelete,
  products,
  uoms,
  isProductsLoading,
  isUOMsLoading,
  gridTemplateColumns,
  rowsLength,
}: GridRowProps<T>) {
  const handleNoMatchClick = useCallback((field: string) => {
    if (field === "particulars") {
      console.log("No product match found. Trigger create product modal or action.");
    } else if (field === "uom") {
      console.log("No UOM match found. Trigger create UOM modal or action.");
    }
  }, []);

  const handleProductChange = useCallback(
    (value: string) => {
      const selectedProduct = products.find((p) => p.basicProductInfo.name === value);
      if (selectedProduct) {
        // Get qty from row or default to 1
        const qty = parseFloat((row as any).qty as string) || 1;
        // Get tax rate
        const taxRate =
          typeof selectedProduct.basicProductInfo.taxGroup === "object" &&
          selectedProduct.basicProductInfo.taxGroup
            ? (selectedProduct.basicProductInfo.taxGroup as Tax).rate
            : 0;
        // Calculate tax amount
        const taxAmount = selectedProduct.pricingAndRates.pRate * (taxRate / 100);
        // Get discount from row or default to 0
        const discount = parseFloat((row as any).discount as string) || 0;
        // Calculate gross: qty * rate
        const gross = qty * selectedProduct.pricingAndRates.pRate;
        // Calculate total: (qty * rate) - discount + tax
        const total = gross - discount + taxAmount;

        // Auto-map fields based on product selection
        onRowUpdate(row.id, "particulars" as keyof T, selectedProduct._id.toString());
        onRowUpdate(row.id, "code" as keyof T, selectedProduct.basicProductInfo.code);
        onRowUpdate(row.id, "uom" as keyof T, selectedProduct.stockAndMeasurement.purchase.toString());
        onRowUpdate(row.id, "rate" as keyof T, selectedProduct.pricingAndRates.pRate.toString());
        onRowUpdate(row.id, "taxPercent" as keyof T, taxRate.toString());
        onRowUpdate(row.id, "tax" as keyof T, taxAmount.toFixed(2));
        onRowUpdate(row.id, "gross" as keyof T, gross.toFixed(2));
        onRowUpdate(row.id, "total" as keyof T, total.toFixed(2));
      } else {
        // If no product is matched, only update particulars with the typed value
        onRowUpdate(row.id, "particulars" as keyof T, value);
      }
    },
    [products, onRowUpdate, row.id, row]
  );

  const handleDiscountChange = useCallback(
    (field: string, value: string) => {
      // Update the changed field (discount or discountPercent)
      onRowUpdate(row.id, field as keyof T, value);

      // Get current row values
      const qty = parseFloat((row as any).qty as string) || 1;
      const rate = parseFloat((row as any).rate as string) || 0;
      const taxPercent = parseFloat((row as any).taxPercent as string) || 0;
      let discount = parseFloat((row as any).discount as string) || 0;
      let discountPercent = parseFloat((row as any).discountPercent as string) || 0;

      // Calculate discount and discountPercent based on the changed field
      if (field === "discountPercent") {
        discountPercent = parseFloat(value) || 0;
        discount = (qty * rate * discountPercent) / 100;
        onRowUpdate(row.id, "discount" as keyof T, discount.toFixed(2));
      } else if (field === "discount") {
        discount = parseFloat(value) || 0;
        discountPercent = qty * rate > 0 ? (discount / (qty * rate)) * 100 : 0;
        onRowUpdate(row.id, "discountPercent" as keyof T, discountPercent.toFixed(2));
      }

      // Calculate gross, tax, and total
      const gross = qty * rate;
      const taxAmount = (qty * rate * taxPercent) / 100;
      const total = gross - discount + taxAmount;

      // Update gross, tax, and total
      onRowUpdate(row.id, "gross" as keyof T, gross.toFixed(2));
      onRowUpdate(row.id, "tax" as keyof T, taxAmount.toFixed(2));
      onRowUpdate(row.id, "total" as keyof T, total.toFixed(2));
    },
    [onRowUpdate, row]
  );

  const handleQtyChange = useCallback(
    (value: string) => {
      // Parse qty and update
      const qty = parseFloat(value) || 0;
      onRowUpdate(row.id, "qty" as keyof T, qty.toString());

      // Get current row values
      const rate = parseFloat((row as any).rate as string) || 0;
      const taxPercent = parseFloat((row as any).taxPercent as string) || 0;
      const discountPercent = parseFloat((row as any).discountPercent as string) || 0;

      // Calculate gross, discount, tax, and total
      const gross = qty * rate;
      const discount = (qty * rate * discountPercent) / 100;
      const taxAmount = (qty * rate * taxPercent) / 100;
      const total = gross - discount + taxAmount;

      // Update fields
      onRowUpdate(row.id, "gross" as keyof T, gross.toFixed(2));
      onRowUpdate(row.id, "discount" as keyof T, discount.toFixed(2));
      onRowUpdate(row.id, "tax" as keyof T, taxAmount.toFixed(2));
      onRowUpdate(row.id, "total" as keyof T, total.toFixed(2));
    },
    [onRowUpdate, row]
  );

  return (
    <div className="grid border-t border-gray-200 dark:border-gray-700" style={{ gridTemplateColumns }}>
      {columns
        .filter((col) => visibleColumns.includes(col.field))
        .map((col) => (
          <div key={col.field} className="p-1 flex items-center border">
            {col.field === "actions" ? (
              <button
                className="text-red-600 hover:text-red-800 disabled:text-red-300"
                onClick={() => onRowDelete(row.id)}
                disabled={rowsLength <= 1}
              >
                <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
              </button>
            ) : col.inputType === "autocomplete" && col.field === "particulars" ? (
              <Autocomplete
                data={products.map((product) => product.basicProductInfo.name)}
                value={
                  products.find((p) => p._id === row[col.field as keyof T])?.basicProductInfo.name ||
                  (row[col.field as keyof T] as string)
                }
                onChange={handleProductChange}
                onNoMatchClick={() => handleNoMatchClick("particulars")}
                isLoading={isProductsLoading}
              />
            ) : col.inputType === "autocomplete" && col.field === "uom" ? (
              <Autocomplete
                data={uoms.map((uom) => uom.name)}
                value={
                  uoms.find((u) => u._id === row[col.field as keyof T])?.name ||
                  (row[col.field as keyof T] as string)
                }
                onChange={(value) => {
                  const selectedUOM = uoms.find((u) => u.name === value);
                  onRowUpdate(row.id, col.field as keyof T, selectedUOM ? selectedUOM._id : value);
                }}
                onNoMatchClick={() => handleNoMatchClick("uom")}
                isLoading={isUOMsLoading}
              />
            ) : (
              <input
                type={col.inputType || "text"}
                value={row[col.field as keyof T] as string}
                onChange={(e) => {
                  if (col.field === "discount" || col.field === "discountPercent") {
                    handleDiscountChange(col.field, e.target.value);
                  } else if (col.field === "qty") {
                    handleQtyChange(e.target.value);
                  } else {
                    onRowUpdate(row.id, col.field as keyof T, e.target.value);
                  }
                }}
                className="w-full border-none bg-transparent p-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
    </div>
  );
}