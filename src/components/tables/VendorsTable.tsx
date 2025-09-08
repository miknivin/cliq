"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetVendorsQuery, useUpdateVendorStatusMutation } from "@/app/redux/api/masters/vendorApi";
import PrimaryLoader from "../ui/loaders/PrimaryLoader";
import { toast } from "react-toastify";

interface Vendor {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  gstin: string;
  status: "Active" | "Inactive";
}

export default function VendorTable() {
  const { data: vendorResponse, isLoading, isError, error } = useGetVendorsQuery({});
   const [updateVendor, { isLoading: isUpdating }] = useUpdateVendorStatusMutation();
  // Map API response to Vendor interface
  const vendorData: Vendor[] = vendorResponse?.vendors
    ?.filter((vendor): vendor is NonNullable<typeof vendor> => vendor !== undefined && vendor !== null)
    .map((vendor) => ({
      id: vendor._id,
      code: vendor.basicInfo.code,
      name: vendor.basicInfo.name,
      phone: vendor.addressAndContact.phone,
      email: vendor.addressAndContact.email,
      gstin: vendor.taxAndCompliance.gstin || "",
      status: vendor.status ?? "Inactive",
    })) || [];

  // Toggle status (placeholder, as mutation isn't provided)


    const handleToggle = async (id: string, currentStatus: "Active" | "Inactive") => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await updateVendor({ _id: id, status: newStatus }).unwrap();
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(`Failed to update vendor status: ${err.data?.message || "Unknown error"}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <PrimaryLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400">
        Error loading vendors: {error?.toString() || "Unknown error"}
      </div>
    );
  }

  if (!vendorData.length) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">No vendors found</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Code</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Phone</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">GSTIN/UIN</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {vendorData.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">{vendor.code}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{vendor.name}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{vendor.phone}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{vendor.email}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{vendor.gstin}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vendor.status === "Active"}
                        onChange={() => handleToggle(vendor.id,vendor.status)}
                        disabled={isUpdating}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                        dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                      />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {vendor.status}
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