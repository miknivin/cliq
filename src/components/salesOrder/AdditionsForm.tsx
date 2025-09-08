import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function Additions() {
  const inputClass = "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [rows, setRows] = useState([{}, {}]);

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (indexToDelete:number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, index) => index !== indexToDelete));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[650px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Debtor
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Creditor
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Amount
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <input className={inputClass} />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <input className={inputClass} />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <input className={inputClass} />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <input className={inputClass} defaultValue="0.00" />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    {rows.length > 1 && (
                      <button onClick={() => handleDeleteRow(index)}>
                        <svg
                          className="w-6 h-6 text-red-500 dark:text-red-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 mb-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleAddRow}
        >
          Add Additions
        </button>
      </div>
    </div>
  );
}