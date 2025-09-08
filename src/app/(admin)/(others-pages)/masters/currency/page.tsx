import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CurrencyHeader from "@/components/page-components/masters/currency/CurrencyHeader";
import CurrencyTable from "@/components/tables/CurrencyTable";
// import BasicTableOne from "@/components/tables/BasicTableOne";
// import UOMTable from "@/components/tables/UomTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Curreny master",
  description:
    "",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <CurrencyHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <CurrencyTable />
        </ComponentCard>
      </div>
    </div>
  );
}
