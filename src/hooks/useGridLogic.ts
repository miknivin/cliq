import { Column } from "@/components/ui/data-grid/GridComponent";
import { useState, useCallback, useRef, useMemo } from "react";

export default function useGridLogic<T extends { id: number }>(columns: Column[], rows: T[]) {
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
  const sortedRows = useMemo(() => {
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
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, field: string) => {
      resizingColumn.current = field;
      startX.current = e.clientX;
      startWidth.current = columnWidths[field] || columns.find((col) => col.field === field)!.defaultWidth;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths, columns]
  );

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
  const totals = useMemo(() => {
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
  const gridTemplateColumns = useMemo(
    () =>
      visibleColumns
        .map((field) => `${columnWidths[field] || columns.find((col) => col.field === field)!.defaultWidth}px`)
        .join(" "),
    [visibleColumns, columnWidths, columns]
  );

  // Toggle column menu visibility
  const toggleColumnMenu = useCallback(() => {
    setIsColumnMenuOpen((prev) => !prev);
  }, []);

  return {
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
  };
}