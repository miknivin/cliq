import React from "react";
import { Column } from "../GridComponent";

interface GridHeaderProps<T> {
  columns: Column[];
  visibleColumns: string[];
  sortConfig: { field: keyof T | null; direction: "asc" | "desc" | null };
  columnWidths: { [key: string]: number };
  onSort: (field: keyof T) => void;
  onMouseDown: (e: React.MouseEvent, field: string) => void;
  gridTemplateColumns: string;
}

export default function GridHeader<T>({ columns, visibleColumns, sortConfig, onSort, onMouseDown, gridTemplateColumns }: GridHeaderProps<T>) {
  return (
    <div className="grid" style={{ gridTemplateColumns }}>
      {columns
        .filter((col) => visibleColumns.includes(col.field))
        .map((col) => (
          <div
            key={col.field}
            className="relative flex items-center p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border"
          >
            <span
              className={col.field !== "actions" ? "cursor-pointer flex-1" : "flex-1"}
              onClick={col.field !== "actions" ? () => onSort(col.field as keyof T) : undefined}
            >
              {col.headerName}
              {sortConfig.field === col.field && sortConfig.direction && (
                <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
              )}
            </span>
            {col.field !== "actions" && (
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500"
                onMouseDown={(e) => onMouseDown(e, col.field)}
              />
            )}
          </div>
        ))}
    </div>
  );
}