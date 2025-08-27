
"use client";

import Link from "next/link";


export default function VendorHeader() {

     
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-start justify-between lg:items-center w-full my-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 text-start">Vendor Master</h3>
      <div className="flex justify-between items-center gap-3 flex-wrap-reverse">
        <div className="flex gap-2">
          <Link href={'vendor/add'} className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
            Add +
          </Link>
        </div>
      </div>
    </div>
  );
}