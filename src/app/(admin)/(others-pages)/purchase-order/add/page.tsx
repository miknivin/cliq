// import ComponentCard from "@/components/common/ComponentCard";
import EditableTitleCard from "@/components/common/EditableTitleCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormGrid from "@/components/page-components/purchaseOrder/FormGrid";
import PurchaseOrderFooter from "@/components/page-components/purchaseOrder/PurchaseOrderFooter";
// import BasicTableOne from "@/components/tables/BasicTableOne";
import PurchaseOrderTable from "@/components/tables/PurchaseOrderTable";
import SpeedDialMenu from "@/components/ui/speed-dial/RightSpeedDial";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Purchase order",
  description: "",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb  />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 relative">
        <FormGrid/>
        <EditableTitleCard  className="mt-2">
          <PurchaseOrderTable />
          <PurchaseOrderFooter/>
         
        </EditableTitleCard>
         <SpeedDialMenu/>
      </div>
    </div>
  );
}
