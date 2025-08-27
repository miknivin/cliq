/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

// Define column configuration
export interface Column {
  field: string;
  headerName: string;
  defaultWidth: number;
  inputType?: "text" | "number"; // Optional input type for cells
}

// Define props for the reusable GridComponent
interface GridComponentProps<T> {
  columns: Column[];
  rows: T[];
  onRowUpdate: (id: number, field: keyof T, value: string) => void;
  onRowDelete: (id: number) => void;
}

export default function GridComponent<T extends { id: number }>({
  columns,
  rows,
  onRowUpdate,
  onRowDelete,
}: GridComponentProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ field: keyof T | null; direction: "asc" | "desc" | null }>({
    field: null,
    direction: null,
  });
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((col) => col.field));
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: col.defaultWidth }), {})
  );
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const resizingColumn = useRef<string | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Handle sorting
  const handleSort = useCallback((field: keyof T) => {
    setSortConfig((prev) => {
      if (prev.field === field && prev.direction === "asc") {
        return { field, direction: "desc" };
      } else if (prev.field === field && prev.direction === "desc") {
        return { field: null, direction: null };
      } else {
        return { field, direction: "asc" };
      }
    });
  }, []);

  // Apply sorting to rows
  const sortedRows = useCallback(() => {
    if (!sortConfig.field || !sortConfig.direction) return rows;
    return [...rows].sort((a, b) => {
      if (sortConfig.field === null) return 0;
      const aValue = a[sortConfig.field] || "";
      const bValue = b[sortConfig.field] || "";
      if (sortConfig.direction === "asc") {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
  }, [rows, sortConfig]);

  // Handle column visibility toggle
  const handleColumnToggle = useCallback((field: string) => {
    setVisibleColumns((prev) =>
      prev.includes(field) ? prev.filter((col) => col !== field) : [...prev, field]
    );
  }, []);

  // Handle column resizing
  const handleMouseDown = useCallback((e: React.MouseEvent, field: string) => {
    resizingColumn.current = field;
    startX.current = e.clientX;
    startWidth.current = columnWidths[field] || columns.find((col) => col.field === field)!.defaultWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [columnWidths, columns]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (resizingColumn.current) {
      const delta = e.clientX - startX.current;
      const newWidth = Math.max(50, startWidth.current + delta); // Minimum width of 50px
      setColumnWidths((prev) => ({
        ...prev,
        [resizingColumn.current!]: newWidth,
      }));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    resizingColumn.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Calculate totals for numeric columns
  const calculateTotals = useCallback(() => {
    const numericFields = ["qty", "frate", "foc", "gross", "discount", "tax", "total"];
    return numericFields.reduce((acc, field) => {
      if (columns.find((col) => col.field === field && col.inputType === "number")) {
        const sum = rows.reduce((sum, row) => {
          const value = parseFloat(row[field as keyof T] as string);
          return sum + (isNaN(value) ? 0 : value);
        }, 0);
        acc[field] = sum.toFixed(2); // Format to 2 decimal places
      } else {
        acc[field] = "";
      }
      return acc;
    }, {} as { [key: string]: string });
  }, [rows, columns]);

  // Generate grid template columns
  const gridTemplateColumns = visibleColumns
    .map((field) => `${columnWidths[field] || columns.find((col) => col.field === field)!.defaultWidth}px`)
    .join(" ");

  return (
    <> <div className="relative mb-4 flex justify-end">
          <button
            className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
          >
            Columns <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" />
          </button>
          {isColumnMenuOpen && (
            <div className="absolute z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800 max-h-32 overflow-auto">
              {columns
                .filter((col) => col.field !== "actions")
                .map((col) => (
                  <label
                    key={col.field}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.field)}
                      onChange={() => handleColumnToggle(col.field)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {col.headerName}
                  </label>
                ))}
            </div>
          )}
        </div>
    <div  className="w-full overflow-x-auto h-auto">
       
      <div  style={{ maxWidth:"1080px"}} className="">
        {/* Column Selection Dropdown */}

        {/* Grid Header */}
        <div
          className="grid "
          style={{ gridTemplateColumns }}
        >
          {columns
            .filter((col) => visibleColumns.includes(col.field))
            .map((col) => (
              <div
                key={col.field}
                className="relative flex items-center p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border"
              >
                <span
                  className={col.field !== "actions" ? "cursor-pointer flex-1" : "flex-1"}
                  onClick={col.field !== "actions" ? () => handleSort(col.field as keyof T) : undefined}
                >
                  {col.headerName}
                  {sortConfig.field === col.field && sortConfig.direction && (
                    <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </span>
                {col.field !== "actions" && (
                  <div
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize  hover:bg-blue-500"
                    onMouseDown={(e) => handleMouseDown(e, col.field)}
                  />
                )}
              </div>
            ))}
        </div>
        {/* Grid Rows */}
        {sortedRows().map((row) => (
          <div
            key={row.id}
            className="grid border-t border-gray-200 dark:border-gray-700 "
            style={{ gridTemplateColumns }}
          >
            {columns
              .filter((col) => visibleColumns.includes(col.field))
              .map((col) => (
                <div
                  key={col.field}
                  className="p-1 flex items-center border"
                >
                  {col.field === "actions" ? (
                    <button
                      className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                      onClick={() => onRowDelete(row.id)}
                      disabled={rows.length <= 1}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                  ) : (
                    <input
                      type={col.inputType || "text"}
                      value={row[col.field as keyof T] as string}
                      onChange={(e) => onRowUpdate(row.id, col.field as keyof T, e.target.value)}
                      className="w-full border-none bg-transparent p-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
          </div>
        ))}
        {/* Grid Footer */}
        <div
          className="grid  border-t border-gray-200 dark:border-gray-700"
          style={{ gridTemplateColumns }}
        >
          {columns
            .filter((col) => visibleColumns.includes(col.field))
            .map((col) => (
              <div
                key={col.field}
                className="p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
              >
                {col.field !== "actions" && calculateTotals()[col.field]
                  ? `${calculateTotals()[col.field]}`
                  : ""}
              </div>
            ))}
        </div>
      </div>
    </div>
        </>

  );
}