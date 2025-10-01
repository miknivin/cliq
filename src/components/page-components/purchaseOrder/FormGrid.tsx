/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/rootReducer';
import { updateField, initialState } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';
import { useGetVendorsQuery } from '@/app/redux/api/masters/vendorApi';
import { useGetCurrenciesQuery } from '@/app/redux/api/masters/currencyApi';
import Autocomplete from '@/components/ui/auto-complete/CustomAutocomplete';
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatDateForInput, toISOString } from '@/app/helpers/dateHelpers';
import SmallPrimaryLoader from '@/components/ui/loaders/SmallPrimaryLoader';
import { v4 as uuidv4 } from 'uuid';
// Utility function to convert ISO string to YYYY-MM-DD for input type="date"


const FormGrid = () => {
  const [selectedVendorId, setSelectedVendorId] = useState<any>(null)
  const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { orderDetails, vendorInformation, financialDetails, productInformation, footer } = useSelector(
    (state: RootState) => state.purchaseOrderForm
  );
  const { data: vendorsResponse, isLoading: isVendorsLoading } = useGetVendorsQuery({});
  const { data: currenciesResponse, isLoading: isCurrenciesLoading } = useGetCurrenciesQuery({});

  // Extract vendors and currencies from response
  const vendors = vendorsResponse?.vendors || [];
  const currencies = currenciesResponse || [];
  // Handle field changes for non-vendor and non-currency fields
  const handleFieldChange = (
    group: keyof typeof initialState,
    field: string,
    value: string | boolean | number
  ) => {
    // Convert date inputs to ISO strings
    if (
      group === 'orderDetails' &&
      ['date', 'dueDate', 'deliveryDate'].includes(field)
    ) {
      dispatch(updateField({ group, field, value: toISOString(value as string) }));
    } else {
      dispatch(updateField({ group, field, value }));
    }
  };

  // Handle vendor selection
  const handleVendorChange = (value: string) => {
   
    const selectedVendor = vendors.find((v) => v?.basicInfo.name === value);

    if (selectedVendor) {
      setSelectedVendorId(selectedVendor._id || null)
      // Update vendor, address, and attention
      dispatch(updateField({ group: 'vendorInformation', field: 'vendor', value: selectedVendor._id }));
      dispatch(updateField({ group: 'vendorInformation', field: 'address', value: selectedVendor.addressAndContact.address || '' }));
      dispatch(updateField({ group: 'vendorInformation', field: 'attention', value: selectedVendor.addressAndContact.contactName || '' }));
      dispatch(updateField({ group: 'financialDetails', field: 'creditLimit', value: selectedVendor.creditAndFinance.creditLimit || '' }));
    } else {
      // Update only vendor field with the typed value
      dispatch(updateField({ group: 'vendorInformation', field: 'vendor', value }));
      dispatch(updateField({ group: 'vendorInformation', field: 'vendor', value }));
    dispatch(updateField({ group: 'vendorInformation', field: 'address', value: '' }));
    dispatch(updateField({ group: 'vendorInformation', field: 'attention', value: '' }));
    dispatch(updateField({ group: 'financialDetails', field: 'creditLimit', value: '' }));
    dispatch(updateField({ group: 'financialDetails', field: 'balance', value: 0 }));
    }
  };

  // Handle currency selection
  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find((c) => c.code === value);
    if (selectedCurrency) {
      // Update currency with code
      dispatch(updateField({ group: 'financialDetails', field: 'currency', value: selectedCurrency.code }));
    } else {
      // Update currency with the typed value
      dispatch(updateField({ group: 'financialDetails', field: 'currency', value }));
    }
  };

  // Handle no match click for vendor
  const handleVendorNoMatchClick = () => {
    console.log('No vendor match found. Trigger create vendor modal or action.');
  };

  // Handle no match click for currency
  const handleCurrencyNoMatchClick = () => {
    console.log('No currency match found. Trigger create currency modal or action.');
  };

  const handleAutoGenerateNo = () => {
    const newPONumber = `PO-${uuidv4().slice(0, 8)}`; // Generate PO number with first 8 chars of UUID
    dispatch(updateField({ group: 'orderDetails', field: 'no', value: newPONumber }));
  };

  useEffect(() => {
  if (selectedVendorId) {
    const fetchBalance = async () => {
      try {
         setIsBalanceLoading(true);
        const response = await axios.get('/api/purchase-order/by-vendor', {
          params: { vendorId: selectedVendorId, netTotal: footer.netTotal },
        });

        if (response.data.balance !== undefined) {
          if (response.data.balance <= 0) {
            toast.error('Insufficient credit: Balance is negative or zero', {
              position: 'top-right',
              autoClose: 5000,
            });
            dispatch(updateField({ group: 'financialDetails', field: 'balance', value: 0 }));
          } else {
            dispatch(updateField({ group: 'financialDetails', field: 'balance', value: response.data.balance }));
          }
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Failed to validate vendor credit limit';
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
        });
        dispatch(updateField({ group: 'financialDetails', field: 'balance', value: 0 }));
      }finally {
        setIsBalanceLoading(false);
      }
    };

    fetchBalance();
  } else {
    dispatch(updateField({ group: 'financialDetails', field: 'balance', value: 0 }));
  }
}, [selectedVendorId, footer.netTotal, dispatch]);

  return (
    <div className="py-2">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="PH">PH</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  No
                </label>
                <button
                  onClick={handleAutoGenerateNo}
                  className="font-medium text-blue-600 dark:text-blue-500 underline mb-2"
                >
                  Auto
                </button>

              </div>
             
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
                value={formatDateForInput(orderDetails.date)}
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
                value={formatDateForInput(orderDetails.dueDate)}
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
                value={formatDateForInput(orderDetails.deliveryDate)}
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
              <Autocomplete
                customInputClass={'bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                data={vendors.map((vendor) => vendor?.basicInfo.name || '')}
                value={
                  vendors.find((v) => v?._id === vendorInformation.vendor)?.basicInfo.name ||
                  vendorInformation.vendor ||
                  ''
                }
                onChange={handleVendorChange}
                onNoMatchClick={handleVendorNoMatchClick}
                isLoading={isVendorsLoading}
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
            <div className="col-span-2">
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
                onChange={(e) => handleFieldChange('financialDetails', 'creditLimit', parseFloat(e.target.value) || 0)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Currency
              </label>
              <Autocomplete
                customInputClass={'bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                data={currencies.map((currency) => currency.code)}
                value={
                  currencies.find((c) => c.code === financialDetails.currency)?.code ||
                  financialDetails.currency ||
                  ''
                }
                onChange={handleCurrencyChange}
                onNoMatchClick={handleCurrencyNoMatchClick}
                isLoading={isCurrenciesLoading}
              />
            </div>
            <div>
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Balance
              </label>
              <input
                type="text"
                id="balance"
                value={financialDetails.balance}
                onChange={(e) => handleFieldChange('financialDetails', 'balance', parseFloat(e.target.value) || 0)}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
               {isBalanceLoading && <SmallPrimaryLoader />}
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