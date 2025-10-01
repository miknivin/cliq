import React from "react";

import PurchaseOrderPage from "@/components/page-components/po/PurchaseOrderPage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderPurchaseOrder(purchaseOrder: any) {
  // Convert JSX to HTML string
  return <PurchaseOrderPage purchaseOrder={purchaseOrder} isSubmitted={false} />

}
