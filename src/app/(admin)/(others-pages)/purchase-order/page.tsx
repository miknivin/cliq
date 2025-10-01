import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PurchaseOrderHeader from "@/components/page-components/purchaseOrder/PurchaseOrderHeader";
import PoTable from "@/components/tables/PoTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Purchase orders",
  description:
    "",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <PurchaseOrderHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <PoTable />
        </ComponentCard>
      </div>
    </div>
  );
}
