import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SalesOrderHeader from "@/components/salesOrder/SalesOrderHeader";
import PoTable from "@/components/tables/PoTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sales orders",
  description:
    "",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <SalesOrderHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <PoTable />
        </ComponentCard>
      </div>
    </div>
  );
}
