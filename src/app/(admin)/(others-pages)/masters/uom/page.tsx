import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UOMHeader from "@/components/page-components/masters/uom/UomHeader";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import UOMTable from "@/components/tables/UomTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "UOM master",
  description:
    "",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <UOMHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <UOMTable />
        </ComponentCard>
      </div>
    </div>
  );
}
