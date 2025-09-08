import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VendorForm from "@/components/page-components/masters/vendor/vendor-form/VendorFormMod";

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
      <div className="space-y-6">
        <VendorForm/>
      </div>
    </div>
  );
}
