import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VendorHeader from "@/components/page-components/masters/vendor/VendorHeader";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import VendorTable from "@/components/tables/VendorsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendor master",
  description:
    "",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <VendorHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <VendorTable />
        </ComponentCard>
      </div>
    </div>
  );
}
