/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetPurchaseOrdersQuery } from "@/app/redux/api/purchaseOrderApi";
import { IPurchaseOrder } from "@/lib/models/PurchaseOrder";
import { Types } from "mongoose";
import { IVendor } from "@/lib/models/masters/Vendor";
import PrimaryLoader from "../ui/loaders/PrimaryLoader";
import ViewIcon from "../ui/icons/ViewIcon";
import DeleteIcon from "../ui/icons/DeleteIcon";
import { useGetCurrenciesQuery } from "@/app/redux/api/masters/currencyApi";
import { ICurrency } from "@/lib/models/masters/Currency";
import { Modal } from "../modal";
import PurchaseOrderPDFViewer from "../page-components/purchaseOrder/PurchaseOrderPDFViewer";

// Type guard for vendor
const isVendor = (vendor: Types.ObjectId | IVendor): vendor is IVendor => {
  return (vendor as IVendor).basicInfo !== undefined;
};

export default function PoTable() {
  // State for modal visibility and selected purchase order ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoId, setSelectedPoId] = useState<string | null>(null);

  // Fetch purchase orders
  const { data, error, isLoading } = useGetPurchaseOrdersQuery({ keyword: undefined });
  const { data: currenciesData, error: currenciesError, isLoading: isCurrenciesLoading } = useGetCurrenciesQuery({});
  const currencies: ICurrency[] = currenciesData || [];

  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency?.symbol || "$";
  };

  // Handle view button click
  const handleViewClick = (order: IPurchaseOrder) => {
    setSelectedPoId((order._id as Types.ObjectId).toString());
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPoId(null);
  };

  if (isLoading || isCurrenciesLoading) {
    return (
      <div className="flex justify-center p-4">
        <PrimaryLoader />
      </div>
    );
  }

  if (error || currenciesError) {
    return (
      <div className="flex justify-center p-4 text-red-500">
        Error: {(error as any)?.message || (currenciesError as any)?.message || "Failed to load data"}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Vendor
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  PO Number
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Due Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.data.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-4 text-center text-gray-500">
                    No purchase orders found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((order: IPurchaseOrder) => (
                  <TableRow key={(order._id as Types.ObjectId).toString()}>
                    <TableCell className="px-5 py-4 text-start">
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {isVendor(order.vendorInformation.vendor)
                          ? order.vendorInformation.vendor.basicInfo.name
                          : "Unknown Vendor"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.orderDetails.no}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {new Date(order.orderDetails.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {getCurrencySymbol(order.financialDetails.currency)}
                      {order.footer.netTotal.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {new Date(order.orderDetails.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewClick(order)}
                          className="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <ViewIcon />
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for PurchaseOrderPDFViewer */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFullscreen={false}
        className="mx-auto"
      >
        {selectedPoId && (
          <PurchaseOrderPDFViewer poId={selectedPoId} />
        )}
      </Modal>
    </div>
  );
}