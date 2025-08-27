import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoryHeader from "@/components/page-components/masters/category/CategoryHeader";
import CategoryTable from "@/components/tables/Categorytable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Category master",
  description:
    "",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb  />
      <CategoryHeader/>
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <CategoryTable />
        </ComponentCard>
      </div>
    </div>
  );
}
