import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Masters | Cliq",
  description: "",
};

const masters = [
  {
    title: "Product Master",
    desc: "Manage items, categories, units, prices, SKUs, and barcodes.",
    href: "product",
  },
  {
    title: "Vendor Master",
    desc: "Maintain supplier details, GST info, and payment terms.",
    href: "vendor",
  },
  {
    title: "Customer Master",
    desc: "Store customer details like codes, contacts, and addresses.",
    href: "#",
  },
   {
    title: "Currency Master",
    desc: "Maintain supported currencies, exchange rates, and symbols.",
    href: "currency",
  },
  
  {
    title: "Warehouse Master",
    desc: "Define warehouses, bins, racks, and storage locations.",
    href: "#",
  },
  {
    title: "Category Master",
    desc: "Classify products into categories and groups.",
    href: "category",
  },
  {
    title: "Unit of Measurement (UOM) Master",
    desc: "Define units and conversion factors (e.g., Box = 12 Pieces).",
    href: "uom",
  },
  {
    title: "Tax Master",
    desc: "Configure tax types, rates, and applicability.",
    href: "tax",
  },
  {
    title: "Price / Discount Master",
    desc: "Set special price lists, wholesale rates, and discounts.",
    href: "#",
  },
  {
    title: "User / Role Master",
    desc: "Manage user accounts, roles, and access permissions.",
    href: "#",
  },
 
];

export default function Masters() {
  return (
    <div>
      <PageBreadcrumb  />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between items-start"
              >
                <a href={master.href}>
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {master.title}
                  </h5>
                </a>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {master.desc}
                </p>
                <Link
                  href={`masters/${master.href}`}
                  className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 "
                >
                  Manage
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
