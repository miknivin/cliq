/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import { addItem, removeItem, updateItem } from "@/app/redux/slices/purchase-order/purchaseOrderSlice";
import GridComponent, { Column } from "../ui/data-grid/GridComponent";
import { useGetProductsQuery } from "@/app/redux/api/masters/productApi";
import { useGetUOMsQuery } from "@/app/redux/api/masters/uomApi";

// Define the row type for TypeScript (matches PurchaseOrderItem in purchaseOrderSlice)
interface Row {
  id: number;
  sno: string;
  code: string;
  ubc: string;
  particulars: string; // Stores Product._id
  remark: string;
  warehouse: string;
  uom: string; // Stores UOM._id
  frate: string;
  qty: string;
  rate: string;
  foc: string;
  gross: string;
  discountPercent: string;
  discount: string;
  taxPercent: string;
  tax: string;
  total: string;
}

// Define column configuration
const initialColumns: Column[] = [
  { field: "sno", headerName: "S.No", defaultWidth: 80, inputType: "text" },
  { field: "code", headerName: "Code", defaultWidth: 100, inputType: "text" },
  { field: "ubc", headerName: "UBC", defaultWidth: 100, inputType: "text" },
  { field: "particulars", headerName: "Particulars", defaultWidth: 220, inputType: "autocomplete" },
  { field: "remark", headerName: "Remark", defaultWidth: 120, inputType: "text" },
  { field: "warehouse", headerName: "Warehouse", defaultWidth: 120, inputType: "text" },
  { field: "uom", headerName: "UOM", defaultWidth: 80, inputType: "autocomplete" },
  { field: "frate", headerName: "F.Rate", defaultWidth: 100, inputType: "number" },
  { field: "qty", headerName: "Qty", defaultWidth: 80, inputType: "number" },
  { field: "rate", headerName: "Rate", defaultWidth: 100, inputType: "number" },
  { field: "foc", headerName: "FOC", defaultWidth: 80, inputType: "number" },
  { field: "gross", headerName: "Gross", defaultWidth: 100, inputType: "number" },
  { field: "discountPercent", headerName: "Discount%", defaultWidth: 100, inputType: "number" },
  { field: "discount", headerName: "Discount", defaultWidth: 100, inputType: "number" },
  { field: "taxPercent", headerName: "Tax%", defaultWidth: 80, inputType: "number" },
  { field: "tax", headerName: "Tax", defaultWidth: 100, inputType: "number" },
  { field: "total", headerName: "Total", defaultWidth: 120, inputType: "number" },
  { field: "actions", headerName: "Actions", defaultWidth: 100 },
];

export default function PurchaseOrderGrid() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.purchaseOrderForm.items);
  const { data: productsResponse, isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: uomsResponse, isLoading: isUOMsLoading } = useGetUOMsQuery();

  // Extract products and uoms from responses
  const products = productsResponse?.data || [];
  const uoms = uomsResponse || [];

  // Handle cell updates
  const handleRowUpdate = useCallback(
    (rowId: number, field: keyof Row, value: string) => {
      dispatch(updateItem({ id: rowId, field, value }));
    },
    [dispatch]
  );

  // Handle row deletion
  const handleRowDelete = useCallback(
    (rowId: number) => {
      dispatch(removeItem(rowId));
    },
    [dispatch]
  );

  // Handle adding a new row
  const handleAddRow = useCallback(() => {
    dispatch(addItem());
  }, [dispatch]);

  return (
    <div className="p-4 rounded-lg shadow-md w-full overflow-x-auto bg-white dark:bg-gray-800">
      {/* Action Buttons */}
      <div className="mb-4 flex gap-2">
        <button
          className="flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleAddRow}
        >
          Add Row
        </button>
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => handleRowDelete(rows[rows.length - 1].id)}
          disabled={rows.length <= 1}
        >
          Remove Last Row
        </button>
      </div>
      {/* Grid Component */}
      <GridComponent
        columns={initialColumns}
        rows={rows}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
        products={products}
        uoms={uoms}
        isProductsLoading={isProductsLoading}
        isUOMsLoading={isUOMsLoading}
      />
    </div>
  );
}