"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/rootReducer';
import { updateField, resetForm, submitForm } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';

const PurchaseOrderFooter = () => {
  const dispatch = useDispatch();
  const { footer, name } = useSelector((state: RootState) => state.purchaseOrderForm);
  const state = useSelector((state: RootState) => state.purchaseOrderForm);
  const { orderDetails, vendorInformation } = useSelector((state: RootState) => state.purchaseOrderForm);
  // Handle input changes for footer fields
  const handleFieldChange = (field: string, value: string | boolean) => {
    dispatch(updateField({ group: 'footer', field, value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation for required fields

    if (!name) {
      alert('Name is required');
      return;
    }
    if (!orderDetails.no) {
      alert('Order number is required');
      return;
    }
    if (!vendorInformation.vendor) {
      alert('Vendor is required');
      return;
    }

    // Dispatch submitForm action
    dispatch(submitForm());
    alert('Purchase order submitted successfully! Check console for details.');
  };

  // Handle preview (just log the state for now)
  const handlePreview = () => {

    console.log('Preview:', {
      name: state.name,
      orderDetails: state.orderDetails,
      vendorInformation: state.vendorInformation,
      financialDetails: state.financialDetails,
      productInformation: state.productInformation,
      items: state.items,
      footer: state.footer,
    });
    // alert('Preview logged to console.');
  };

  // Handle clear (reset form)
  const handleClear = () => {
    dispatch(resetForm());
    alert('Form cleared.');
  };

  // Handle cancel (reset form and notify)
  const handleCancel = () => {
    dispatch(resetForm());
    alert('Form cancelled.');
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
              value={footer.total}
              onChange={(e) => handleFieldChange('total', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="discount-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Discount
            </label>
            <input
              type="text"
              id="discount-input"
              value={footer.discount}
              onChange={(e) => handleFieldChange('discount', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              value={footer.netTotal}
              onChange={(e) => handleFieldChange('netTotal', e.target.value)}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type='button'
          role='button'
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button
          className="flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Save
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
    </div>
  );
};

export default PurchaseOrderFooter;