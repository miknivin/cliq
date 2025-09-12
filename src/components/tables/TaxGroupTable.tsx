/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tax, useGetTaxesQuery, useChangeStatusOfTaxMutation } from "@/app/redux/api/masters/taxApi";

const TaxGroupTable = () => {
  const { data: taxResponse, isLoading, error } = useGetTaxesQuery();
  const [changeStatusOfTax] = useChangeStatusOfTaxMutation();

  const handleStatusToggle = async (taxId: string, currentStatus: "Active" | "Inactive" | "Draft") => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await changeStatusOfTax({ _id: taxId, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Error updating tax status:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 dark:text-gray-400">Loading taxes...</span>
      </div>
    );
  }

  if (error || !taxResponse?.success || !taxResponse?.data) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500 dark:text-red-400">
          Failed to load taxes. Please try again.
        </span>
      </div>
    );
  }

  const taxGroups: Tax[] = taxResponse.data;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[950px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tax Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Rate
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {taxGroups.map((tax) => (
                <TableRow key={tax._id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {tax.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {tax.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {tax.type}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {tax.type === "slab"
                      ? "Slab-based"
                      : `${tax.rate?.toFixed(2)}${tax.type === "percentage" ? "%" : ""}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tax.status === "Active"}
                        onChange={() => handleStatusToggle(tax._id!, tax.status)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {tax.status}
                      </span>
                    </label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxGroupTable;