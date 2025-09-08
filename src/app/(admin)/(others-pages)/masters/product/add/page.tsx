import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductForm from "@/components/page-components/masters/product/product-form/ProductForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cliq",
  description: "",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb />
      <div className="space-y-6">
        <ProductForm/>
      </div>
    </div>
  );
}
