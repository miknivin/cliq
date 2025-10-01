"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import GridComponent, { Column } from "../ui/data-grid/GridComponent";
// Define the row type for TypeScript
interface Row {
  id: number;
  sno: string;
  code: string;
  particulars: string;
  uom: string;
  mrp: string;
  rate: string;
  qty: string;
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
  { field: "particulars", headerName: "Particulars", defaultWidth: 220, inputType: "text" },
  { field: "uom", headerName: "UOM", defaultWidth: 80, inputType: "text" },
  { field: "mrp", headerName: "MRP", defaultWidth: 100, inputType: "number" },
  { field: "rate", headerName: "Rate", defaultWidth: 100, inputType: "number" },
  { field: "qty", headerName: "Qty", defaultWidth: 80, inputType: "number" },
  { field: "foc", headerName: "FOC", defaultWidth: 80, inputType: "number" },
  { field: "gross", headerName: "Gross", defaultWidth: 100, inputType: "number" },
  { field: "discountPercent", headerName: "Discount%", defaultWidth: 100, inputType: "number" },
  { field: "discount", headerName: "Discount", defaultWidth: 100, inputType: "number" },
  { field: "taxPercent", headerName: "Tax%", defaultWidth: 80, inputType: "number" },
  { field: "tax", headerName: "Tax", defaultWidth: 100, inputType: "number" },
  { field: "total", headerName: "Total", defaultWidth: 120, inputType: "number" },
  { field: "actions", headerName: "Actions", defaultWidth: 100 },
];

export default function SalesOrderTable() {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      sno: "1",
      code: "",
      particulars: "",
      uom: "",
      mrp: "0.00",
      rate: "0.00",
      qty: "0.00",
      foc: "0.00",
      gross: "0.00",
      discountPercent: "0.00",
      discount: "0.00",
      taxPercent: "0.00",
      tax: "0.00",
      total: "0.00",
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
              sno: (prevRows.length + 1).toString(),
              code: "",
              particulars: "",
              uom: "",
              mrp: "0.00",
              rate: "0.00",
              qty: "0.00",
              foc: "0.00",
              gross: "0.00",
              discountPercent: "0.00",
              discount: "0.00",
              taxPercent: "0.00",
              tax: "0.00",
              total: "0.00",
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
            sno: (index + 1).toString(),
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
        sno: (prevRows.length + 1).toString(),
        code: "",
        particulars: "",
        uom: "",
        mrp: "0.00",
        rate: "0.00",
        qty: "0.00",
        foc: "0.00",
        gross: "0.00",
        discountPercent: "0.00",
        discount: "0.00",
        taxPercent: "0.00",
        tax: "0.00",
        total: "0.00",
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
      <GridComponent
        columns={initialColumns}
        rows={rows}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
      />

    </div>
  );
}