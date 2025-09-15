import React from "react";
import { Column } from "../GridComponent";

interface ColumnModalContentProps {
  columns: Column[];
  visibleColumns: string[];
  onColumnToggle: (field: string) => void;
}

export default function ColumnModalContent({ columns, visibleColumns, onColumnToggle }: ColumnModalContentProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Select Columns</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {columns
          .filter((col) => col.field !== "actions")
          .map((col) => (
            <label
              key={col.field}
              className="flex items-center px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.field)}
                onChange={() => onColumnToggle(col.field)}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {col.headerName}
            </label>
          ))}
      </div>
    </div>
  );
}