/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from 'react';
import { useGetPurchaseOrderPDFQuery } from '@/app/redux/api/purchaseOrderApi';
import PrimaryLoader from '@/components/ui/loaders/PrimaryLoader';

interface PurchaseOrderPDFViewerProps {
  poId: string;
}

export default function PurchaseOrderPDFViewer({ poId }: PurchaseOrderPDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { data, error, isLoading } = useGetPurchaseOrderPDFQuery({ poId });

  useEffect(() => {
    if (data && data.pdf) {
      try {
        // Decode base64 to binary
        const binaryString = atob(data.pdf);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });

        console.log("Created Blob size:", blob.size, "type:", blob.type);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (decodeError) {
        console.error("Failed to decode base64 PDF:", decodeError);
      }
    }
    return () => {};
  }, [data]);

  if (isLoading) {
    return <div className="w-full flex justify-center h-screen items-center"><PrimaryLoader/></div>;
  }

  if (error) {
    return <div className="text-red-600 flex justify-center w-full">Error: {(error as any).message || 'Failed to load PDF'}</div>;
  }

  if (!data?.pdf || !pdfUrl) {
    return <div>No PDF available</div>;
  }

  return (
    <div className="w-full h-[98vh]">
      <object
        data={pdfUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        className="border border-gray-300"
      >
        <p>
          Your browser does not support PDFs.{' '}
          <a href={pdfUrl} download={data.filename || `purchase-order-${poId}.pdf`} className="text-blue-600 underline">
            Download the PDF
          </a>
        </p>
      </object>
    </div>
  );
}