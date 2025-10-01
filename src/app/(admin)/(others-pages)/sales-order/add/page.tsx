// import ComponentCard from "@/components/common/ComponentCard";
import EditableTitleCard from "@/components/common/EditableTitleCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SalesOrderFooter from "@/components/salesOrder/SalesOrderFooter";
import SalesOrderFormGrid from "@/components/salesOrder/SalesOrderFormGrid";
import SalesOrderTable from "@/components/tables/SalesOrderTable";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add sales order",
  description: "",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5">
        <SalesOrderFormGrid/>
        <EditableTitleCard  className="mt-2">
          <SalesOrderTable />
          <SalesOrderFooter/>
        </EditableTitleCard>
      </div>
    </div>
  );
}
