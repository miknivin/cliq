import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TaxHeader from "@/components/page-components/masters/tax/TaxHeader";
import TaxGroupTable from "@/components/tables/TaxGroupTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tax master",
  description:
    "",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <TaxHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <TaxGroupTable />
        </ComponentCard>
      </div>
    </div>
  );
}
