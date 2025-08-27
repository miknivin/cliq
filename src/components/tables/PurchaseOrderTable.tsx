/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import GridComponent, { Column } from "../ui/data-grid/GridComponent";
import PurchaseOrderFooter from "../purchaseOrder/PurchaseOrderFooter";

// Define the row type for TypeScript
interface Row {
  id: number;
  sno: string;
  code: string;
  ubc: string;
  particulars: string;
  remark: string;
  warehouse: string;
  uom: string;
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
  { field: "particulars", headerName: "Particulars", defaultWidth: 220, inputType: "text" },
  { field: "remark", headerName: "Remark", defaultWidth: 120, inputType: "text" },
  { field: "warehouse", headerName: "Warehouse", defaultWidth: 120, inputType: "text" },
  { field: "uom", headerName: "UOM", defaultWidth: 80, inputType: "text" },
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
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      sno: "",
      code: "",
      ubc: "",
      particulars: "",
      remark: "",
      warehouse: "",
      uom: "",
      frate: "",
      qty: "",
      rate: "",
      foc: "",
      gross: "",
      discountPercent: "",
      discount: "",
      taxPercent: "",
      tax: "",
      total: "",
    },
  ]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle cell updates
  const handleRowUpdate = useCallback(
    (rowId: number, field: keyof Row, value: string) => {
      if (isMounted.current) {
        setRows((prevRows) => {
          const updatedRows = prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          );
          if (rowId === prevRows.length) {
            const newRow: Row = {
              id: prevRows.length + 1,
              sno: "",
              code: "",
              ubc: "",
              particulars: "",
              remark: "",
              warehouse: "",
              uom: "",
              frate: "",
              qty: "",
              rate: "",
              foc: "",
              gross: "",
              discountPercent: "",
              discount: "",
              taxPercent: "",
              tax: "",
              total: "",
            };
            return [...updatedRows, newRow];
          }
          return updatedRows;
        });
      }
    },
    []
  );

  // Handle row deletion
  const handleRowDelete = useCallback((rowId: number) => {
    setRows((prevRows) => {
      if (prevRows.length > 1) {
        return prevRows
          .filter((row) => row.id !== rowId)
          .map((row, index) => ({
            ...row,
            id: index + 1,
          }));
      }
      return prevRows;
    });
  }, []);

  // Handle adding a new row
  const handleAddRow = useCallback(() => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        sno: "",
        code: "",
        ubc: "",
        particulars: "",
        remark: "",
        warehouse: "",
        uom: "",
        frate: "",
        qty: "",
        rate: "",
        foc: "",
        gross: "",
        discountPercent: "",
        discount: "",
        taxPercent: "",
        tax: "",
        total: "",
      },
    ]);
  }, []);

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
      />
      <PurchaseOrderFooter/>
    </div>
  );
}