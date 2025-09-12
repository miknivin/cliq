"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Product, useGetProductsQuery } from "@/app/redux/api/masters/productApi";
import PrimaryLoader from "../ui/loaders/PrimaryLoader";
import { IVendor } from "@/lib/models/masters/Vendor";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// Extend Product type to ensure vendor is IVendor (populated)
interface PopulatedProduct extends Product {
  productProperties: {
    generalSettings: Product['productProperties']['generalSettings'];
    categorization: {
      group: string ;
      subGroup: string;
      vendor: IVendor;
      brand: string;
    };
  };
}

// Helper function to extract error message
const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
  if (!error) return 'Unknown error';
  if ('status' in error) {
    // FetchBaseQueryError
    if (error.status === 'FETCH_ERROR') {
      return error.error || 'Network error occurred';
    }
    if ('data' in error && error.data && typeof error.data === 'object' && 'error' in error.data) {
      return String(error.data.error) || 'Failed to fetch products';
    }
    return `Error ${error.status}`;
  }
  // SerializedError
  return error.message || 'An unexpected error occurred';
};

const ProductTable = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400 flex justify-center">
        <PrimaryLoader />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Error fetching products: {getErrorMessage(error)}
      </div>
    );
  }

  const products = data.data as PopulatedProduct[];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Product Name
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
                  Stock
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  MRP
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Vendor
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.map((product: PopulatedProduct) => (
                <TableRow key={product._id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.basicProductInfo.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.basicProductInfo.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.stockAndMeasurement.openingStock}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    ₹{product.pricingAndRates.mrp.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.productProperties.categorization.vendor?.basicInfo?.name || "Unknown Vendor"}
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

export default ProductTable;