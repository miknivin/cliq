import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/app/redux/api/masters/productApi";
import { IUOMResponse } from "@/app/redux/api/masters/uomApi";
import GridRow from "./components/GridRow";
import useGridLogic from "@/hooks/useGridLogic";
import { Modal } from "../modal";
import ColumnModalContent from "./components/ColumnsModalComponent";
import GridHeader from "./components/GridHeader";

// Define column configuration
export interface Column {
  field: string;
  headerName: string;
  defaultWidth: number;
  inputType?: "text" | "number" | "autocomplete";
}

// Define props for the reusable GridComponent
interface GridComponentProps<T> {
  columns: Column[];
  rows: T[];
  onRowUpdate: (id: number, field: keyof T, value: string) => void;
  onRowDelete: (id: number) => void;
  products?: Product[];
  uoms?: IUOMResponse[];
  isProductsLoading?: boolean;
  isUOMsLoading?: boolean;
}

export default function GridComponent<T extends { id: number }>({
  columns,
  rows,
  onRowUpdate,
  onRowDelete,
  products = [],
  uoms = [],
  isProductsLoading = false,
  isUOMsLoading = false,
}: GridComponentProps<T>) {
  const {
    sortConfig,
    visibleColumns,
    columnWidths,
    isColumnMenuOpen,
    sortedRows,
    totals,
    handleSort,
    handleColumnToggle,
    handleMouseDown,
    gridTemplateColumns,
    toggleColumnMenu,
  } = useGridLogic<T>(columns, rows);

  return (
    <>
      <div className="relative mb-4 flex justify-end">
        <button
          className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={toggleColumnMenu}
        >
          Columns <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" />
        </button>
        <Modal
          isOpen={isColumnMenuOpen}
          onClose={toggleColumnMenu}
          className="w-full max-w-md p-6"
          showCloseButton={true}
          isFullscreen={false}
        >
          <ColumnModalContent
            columns={columns}
            visibleColumns={visibleColumns}
            onColumnToggle={handleColumnToggle}
          />
        </Modal>
      </div>
      <div className="w-full overflow-x-auto h-auto border border-collapse">
        <div style={{ maxWidth: "1080px" }}>
          {/* Grid Header */}
          <GridHeader
            columns={columns}
            visibleColumns={visibleColumns}
            sortConfig={sortConfig}
            columnWidths={columnWidths}
            onSort={handleSort}
            onMouseDown={handleMouseDown}
            gridTemplateColumns={gridTemplateColumns}
          />
          {/* Grid Rows */}
          <div className="border border-r-0 w-fit min-h-[250px]">
            {sortedRows.map((row) => (
              <GridRow
                key={row.id}
                row={row}
                columns={columns}
                visibleColumns={visibleColumns}
                columnWidths={columnWidths}
                onRowUpdate={onRowUpdate}
                onRowDelete={onRowDelete}
                products={products}
                uoms={uoms}
                isProductsLoading={isProductsLoading}
                isUOMsLoading={isUOMsLoading}
                gridTemplateColumns={gridTemplateColumns}
                rowsLength={rows.length}
              />
            ))}
          </div>
          {/* Grid Footer */}
          <div
            className="grid border-t border-gray-200 dark:border-gray-700"
            style={{ gridTemplateColumns }}
          >
            {columns
              .filter((col) => visibleColumns.includes(col.field))
              .map((col) => (
                <div
                  key={col.field}
                  className="p-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border"
                >
                  {col.field !== "actions" && totals[col.field] ? `${totals[col.field]}` : ""}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}