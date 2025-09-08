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
import { useGetCategoriesQuery, useUpdateCategoryMutation } from "@/app/redux/api/masters/categoryApi";
import PrimaryLoader from "../ui/loaders/PrimaryLoader";



export default function CategoryTable() {
  const { data: categoryData = [], isLoading, error } = useGetCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();

  // Handle toggle switch
  const handleToggle = async (_id: string, currentStatus: "Active" | "Inactive") => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await updateCategory({ _id, status: newStatus }).unwrap();
    } catch (err) {
      console.error('Error updating category status:', err);
      alert('Failed to update category status');
    }
  };

  if (isLoading) {
    return <div className="w-full flex justify-center"><PrimaryLoader/></div>;
  }

  if (error) {
    return <div>Error loading categories: {(error as any).data?.message || 'Unknown error'}</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
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
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Parent Category
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
              {categoryData.map((cat, index) => (
                <TableRow key={cat._id ? String(cat._id) : index}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {cat.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cat.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {cat.parentCategory || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cat.status === "Active"}
                        onChange={() => handleToggle(cat._id, cat.status)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                        dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                      />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {cat.status}
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
}