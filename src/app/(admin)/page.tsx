"use client"
// import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";



export default function Ecommerce() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if redirectedToMain query param is true
    const redirectedToMain = searchParams.get("redirectedToMain");

    if (redirectedToMain !== "true") {
      // Navigate to /main-window with redirectedToMain=true
      router.replace("/main-window?redirectedToMain=true");
    }
  }, [router, searchParams]);

  // Render the component only if redirectedToMain is true or after navigation
  if (searchParams.get("redirectedToMain") !== "true") {
    return null; // Prevent rendering until navigation occurs
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}