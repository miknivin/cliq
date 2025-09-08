
"use client";
import Button from "@/components/ui/button/Button";
import Link from "next/link";

export default function ProductHeader() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-start justify-between lg:items-center w-full my-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 text-start">Product Master</h3>
      <div className="flex justify-between items-center gap-3 flex-wrap-reverse">
        <div className="flex gap-2">
          <Link href={'/masters/product/add'}>
            <Button size="sm" variant="primary">
              Add +
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}