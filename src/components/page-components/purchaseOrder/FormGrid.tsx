// File: components/page-components/purchaseOrder/FormGrid.tsx
"use client";
import { RootState } from '@/app/redux/rootReducer';
import { updateField, initialState } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FormGrid = () => {
  const dispatch = useDispatch();
  const { orderDetails, vendorInformation, financialDetails, productInformation } = useSelector(
    (state: RootState) => state.purchaseOrderForm
  );

  const handleFieldChange = (
    group: keyof typeof initialState,
    field: string,
    value: string | boolean
  ) => {
    dispatch(updateField({ group, field, value }));
  };

  return (
    <div className="px-3 py-2">
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
        {/* Order Details */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="voucher-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Voucher Type
              </label>
              <select
                id="voucher-type"
                value={orderDetails.voucherType}
                onChange={(e) => handleFieldChange('orderDetails', 'voucherType', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="PH">PH</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                No
              </label>
              <input
                type="text"
                id="no"
                value={orderDetails.no}
                onChange={(e) => handleFieldChange('orderDetails', 'no', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={orderDetails.date}
                onChange={(e) => handleFieldChange('orderDetails', 'date', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="due-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Due Date
              </label>
              <input
                type="date"
                id="due-date"
                value={orderDetails.dueDate}
                onChange={(e) => handleFieldChange('orderDetails', 'dueDate', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="delivery-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Delivery Date
              </label>
              <input
                type="date"
                id="delivery-date"
                value={orderDetails.deliveryDate}
                onChange={(e) => handleFieldChange('orderDetails', 'deliveryDate', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Vendor Information */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Vendor Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vendor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vendor
              </label>
              <input
                type="text"
                id="vendor"
                value={vendorInformation.vendor}
                onChange={(e) => handleFieldChange('vendorInformation', 'vendor', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <textarea
                id="address"
                value={vendorInformation.address}
                onChange={(e) => handleFieldChange('vendorInformation', 'address', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="attention" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Attention
              </label>
              <input
                type="text"
                id="attention"
                value={vendorInformation.attention}
                onChange={(e) => handleFieldChange('vendorInformation', 'attention', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Financial Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="payment-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Payment Mode
              </label>
              <select
                id="payment-mode"
                value={financialDetails.paymentMode}
                onChange={(e) => handleFieldChange('financialDetails', 'paymentMode', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            <div>
              <label htmlFor="credit-limit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Credit Limit
              </label>
              <input
                type="text"
                id="credit-limit"
                value={financialDetails.creditLimit}
                onChange={(e) => handleFieldChange('financialDetails', 'creditLimit', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Currency
              </label>
              <select
                id="currency"
                value={financialDetails.currency}
                onChange={(e) => handleFieldChange('financialDetails', 'currency', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none">None</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Balance
              </label>
              <input
                type="text"
                id="balance"
                value={financialDetails.balance}
                onChange={(e) => handleFieldChange('financialDetails', 'balance', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Product Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vendor-products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Vendor Products
              </label>
              <select
                id="vendor-products"
                value={productInformation.vendorProducts}
                onChange={(e) => handleFieldChange('productInformation', 'vendorProducts', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Re-Order Level">Re-Order Level</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="reference" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Reference
              </label>
              <select
                id="reference"
                value={productInformation.reference}
                onChange={(e) => handleFieldChange('productInformation', 'reference', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="TELEPHONIC">TELEPHONIC</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="mr-no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                MR No
              </label>
              <input
                type="text"
                id="mr-no"
                value={productInformation.mrNo}
                onChange={(e) => handleFieldChange('productInformation', 'mrNo', e.target.value)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="inline-flex items-start flex-col justify-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productInformation.ownProductsOnly}
                  onChange={(e) => handleFieldChange('productInformation', 'ownProductsOnly', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Own Products Only
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGrid;