/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/rootReducer';
import { updateField, resetForm, PurchaseOrderState } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';
import { usePurchaseOrderTotals } from '@/hooks/useOrderTotal';
import { useCreatePurchaseOrderMutation } from '@/app/redux/api/purchaseOrderApi';
import { toast } from 'react-toastify';
import { validatePurchaseOrder, ValidationError } from '@/lib/validators/purchaseOrderValidation';
import PurchaseOrderPage from '@/app/(admin)/(others-pages)/po/page';
import { Modal } from '@/components/modal';
import axios from 'axios';

const PurchaseOrderFooter = () => {
  const dispatch = useDispatch();
  const { name, orderDetails, vendorInformation, financialDetails, productInformation, items, footer } = useSelector(
    (state: RootState) => state.purchaseOrderForm
  );
  const { total, discount, netTotal } = usePurchaseOrderTotals();
  const [createPurchaseOrder, { isLoading, error }] = useCreatePurchaseOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [productNames, setProductNames] = useState<(string | null)[]>([]);
  const [currency, setCurrency] = useState<string | null>(null);
  const handleFieldChange = (field: string, value: string | boolean) => {
    if (field === 'notes' || field === 'taxable') {
      dispatch(updateField({ group: 'footer', field, value }));
    } else {
      dispatch(updateField({ group: 'footer', field, value: parseFloat(value as string) || 0 }));
    }
  };

  const fetchVendorName = async (vendorId: string) => {
    try {
      const response = await axios.get(`/api/masters/vendor/${vendorId}/lite`);
      return response.data.name || vendorId; // Return name or fallback to ID
    } catch (error) {
      console.error('Error fetching vendor name:', error);
      return vendorId; // Fallback to ID on error
    }
  };

  const fetchProductName = async (productId: string) => {
    try {
      const response = await axios.get(`/api/masters/product/${productId}/lite`);
      return response.data.name || productId; // Return name or fallback to ID
    } catch (error) {
      console.error('Error fetching product name:', error);
      return productId; // Fallback to ID on error
    }
  };

    const fetchCurrency = async (currencyCode: string) => {
    try {
      const response = await axios.get(`/api/masters/currency`, {
        params: { code: currencyCode },
      });
      // Assuming the response returns an array, take the first match (exact code match)
      const currencyData = response.data[0];
      return currencyData ? `${currencyData.symbol}` : currencyCode; // Return formatted string or fallback to code
    } catch (error) {
      console.error('Error fetching currency:', error);
      return currencyCode; // Fallback to code on error
    }
  };

  const handleSubmit = async () => {
    // Prepare data for validation
    const data = {
      name,
      orderDetails: {
        ...orderDetails,
        date: orderDetails.date || new Date().toISOString(),
        dueDate: orderDetails.dueDate || new Date().toISOString(),
        deliveryDate: orderDetails.deliveryDate || new Date().toISOString(),
      },
      vendorInformation,
      financialDetails,
      productInformation,
      items: items.map((item: any) => ({
        ...item,
        particulars: item.particulars || '',
        uom: item.uom || '',
        sno: item.sno || '',
        code: item.code || '',
        ubc: item.ubc || '',
        remark: item.remark || '',
        warehouse: item.warehouse || '',
        frate: item.frate || 0,
        qty: item.qty || 0,
        rate: item.rate || 0,
        foc: item.foc || 0,
        gross: item.gross || 0,
        discountPercent: item.discountPercent || 0,
        discount: item.discount || 0,
        taxPercent: item.taxPercent || 0,
        tax: item.tax || 0,
        total: item.total || 0,
      })),
      footer: {
        ...footer,
        total,
        discount,
        netTotal,
      },
      isSubmitted: true,
    };

    // Client-side validation
    const validationErrors: ValidationError[] = validatePurchaseOrder(data);
    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.map((e) => `${e.message} (${e.field})`).join('\n');
      toast.error(`Validation failed:\n${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    try {
      const payload: PurchaseOrderState = data;
      const response = await createPurchaseOrder(payload).unwrap();
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      dispatch(resetForm()); // Clear form after successful submission
      setVendorName(null); // Reset vendor name
      setProductNames([]); // Reset product names
    } catch (err) {
      const errorResponse = err as { data: { message: string; errors?: ValidationError[]; error?: string }; status: number };
      const errorMessage = errorResponse?.data?.errors
        ? errorResponse?.data?.errors.map((e) => `${e?.message} (${e?.field})`).join('\n')
        : errorResponse?.data?.error || 'Unknown error';
      toast.error(`Submission failed: ${errorResponse.data.message}\n${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const handlePreview = async () => {
    setIsFetching(true);
    toast.info('Fetching vendor and product details...', {
      position: 'top-right',
      autoClose: 3000,
    });

    // Fetch vendor name
    const fetchedVendorName = vendorInformation.vendor ? await fetchVendorName(vendorInformation.vendor) : vendorInformation.vendor;
    setVendorName(fetchedVendorName);

    // Fetch product names
    const fetchedProductNames = await Promise.all(
      items.map(async (item) => {
        return item.particulars ? await fetchProductName(item.particulars) : item.particulars || '';
      })
    );
    setProductNames(fetchedProductNames);

    const fetchedCurrency = financialDetails.currency ? await fetchCurrency(financialDetails.currency) : financialDetails.currency;
    setCurrency(fetchedCurrency);
    console.log(fetchedCurrency,'currency');
    
    setIsFetching(false);

    // Prepare data for preview
    const data: PurchaseOrderState = {
      name,
      orderDetails: {
        ...orderDetails,
        date: orderDetails.date || new Date().toISOString(),
        dueDate: orderDetails.dueDate || new Date().toISOString(),
        deliveryDate: orderDetails.deliveryDate || new Date().toISOString(),
      },
      vendorInformation,
      financialDetails,
      productInformation,
      items: items.map((item, index) => ({
        ...item,
        particulars: fetchedProductNames[index] || item.particulars || '',
        uom: item.uom || '',
        sno: item.sno || '',
        code: item.code || '',
        ubc: item.ubc || '',
        remark: item.remark || '',
        warehouse: item.warehouse || '',
        frate: item.frate || 0,
        qty: item.qty || 0,
        rate: item.rate || 0,
        foc: item.foc || 0,
        gross: item.gross || 0,
        discountPercent: item.discountPercent || 0,
        discount: item.discount || 0,
        taxPercent: item.taxPercent || 0,
        tax: item.tax || 0,
        total: item.total || 0,
      })),
      footer: {
        ...footer,
        total,
        discount,
        netTotal,
      },
      isSubmitted: false,
    };

    // Client-side validation
    const validationErrors: ValidationError[] = validatePurchaseOrder(data);
    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.map((e) => `${e.message} (${e.field})`).join('\n');
      toast.error(`Validation failed:\n${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      setVendorName(null); // Reset vendor name on validation failure
      setProductNames([]); // Reset product names on validation failure
      return;
    }

    // If validation passes, open the modal
    setIsModalOpen(true);
    console.log('Preview:', data); // For debugging
  };

  const handleClear = () => {
    dispatch(resetForm());
    setVendorName(null); // Reset vendor name
    setProductNames([]); // Reset product names
    toast.info('Form cleared', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleCancel = () => {
    dispatch(resetForm());
    setVendorName(null); // Reset vendor name
    setProductNames([]); // Reset product names
    toast.info('Form cancelled', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="flex flex-col p-4 border-t">
      <div className="flex justify-between mb-4 gap-8">
        <div className="w-3/4">
          <div>
            <label htmlFor="notes-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Notes
            </label>
            <textarea
              id="notes-input"
              value={footer.notes}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-24"
            />
            <div className="mt-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footer.taxable}
                  onChange={(e) => handleFieldChange('taxable', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Taxable
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-end">
          <div>
            <label htmlFor="total-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Total
            </label>
            <input
              type="text"
              id="total-input"
              value={total.toFixed(2)}
              readOnly
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="discount-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Discount
            </label>
            <input
              type="text"
              id="discount-input"
              value={discount.toFixed(2)}
              readOnly
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="addition-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Addition
            </label>
            <input
              type="text"
              id="addition-input"
              value={footer.addition}
              onChange={(e) => handleFieldChange('addition', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="advance-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Advance
            </label>
            <input
              type="text"
              id="advance-input"
              value={footer.advance}
              onChange={(e) => handleFieldChange('advance', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="net-total-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Net Total
            </label>
            <input
              type="text"
              id="net-total-input"
              value={netTotal.toFixed(2)}
              readOnly
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          role="button"
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={handlePreview}
          disabled={isFetching}
        >
          {isFetching ? 'Fetching...' : 'Preview'}
        </button>
        <button
          className="flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isLoading || isFetching}
        >
          {isLoading ? 'Submitting...' : 'Save'}
        </button>
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-600 dark:text-red-400">
          Error: {(error as any).data?.message || 'Submission failed'}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setVendorName(null); // Reset vendor name
          setProductNames([]); // Reset product names
        }}
        className="max-w-4xl p-6"
        showCloseButton={true}
        isFullscreen={false}
      >
        <PurchaseOrderPage
          purchaseOrder={{
            currency: currency || financialDetails.currency || '',
            poNumber: orderDetails.no,
            date: orderDetails.date,
            vendor: {
              name: vendorName || vendorInformation.vendor, // Use fetched vendor name or fallback to ID
              address: vendorInformation.address,
              contact: vendorInformation.attention,
              phone: '', // Add phone if available
            },
            items: items.map((item, index) => ({
              sno: item.sno,
              code: item.code,
              particulars: productNames[index] || item.particulars || '', // Use fetched product name or fallback to ID
              qty: item.qty.toString(),
              rate: item.rate.toString(),
              frate: item.frate.toString(),
              discount: item.discount.toString(),
              tax: item.tax.toString(),
              total: item.total.toString(),
            })),
            totals: {
              gross: items.reduce((sum, item) => sum + item.gross, 0).toString(),
              discount: footer.discount.toString(),
              tax: items.reduce((sum, item) => sum + item.tax, 0).toString(),
              frate: items.reduce((sum, item) => sum + item.frate, 0).toString(),
              total: footer.netTotal.toString(),
            },
          }}
        />
      </Modal>
    </div>
  );
};

export default PurchaseOrderFooter;