"use client";
import React from 'react';

const FormGrid = () => {
  return (
    <div className="px-3">
      <div className="grid grid-cols-4 gap-4">
        {/* Voucher Type */}
        <div>
          <label htmlFor="voucher-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Voucher Type
          </label>
          <select
            id="voucher-type"
            defaultValue="PH"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="PH">PH</option>
            <option value="Other">Other</option> {/* Add more options as needed */}
          </select>
        </div>
        {/* Vendor */}
        <div>
          <label htmlFor="vendor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Vendor
          </label>
          <input
            type="text"
            id="vendor"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Payment Mode */}
        <div>
          <label htmlFor="payment-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Payment Mode
          </label>
          <select
            id="payment-mode"
            defaultValue="Cash"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option> {/* Add more options as needed */}
          </select>
        </div>
        {/* No */}
        <div>
          <label htmlFor="no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            No
          </label>
          <input
            type="text"
            id="no"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <textarea
            id="address"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Due Date */}
        <div>
          <label htmlFor="due-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Due Date
          </label>
          <input
            type="date"
            id="due-date"
            defaultValue="2025-08-14"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Date */}
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            defaultValue="2025-08-14"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Delivery Date */}
        <div>
          <label htmlFor="delivery-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Delivery Date
          </label>
          <input
            type="date"
            id="delivery-date"
            defaultValue="2025-08-14"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Credit Limit */}
        <div>
          <label htmlFor="credit-limit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Credit Limit
          </label>
          <input
            type="text"
            id="credit-limit"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Currency
          </label>
          <select
            id="currency"
            defaultValue="none"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="none">None</option>
            <option value="USD">USD</option> {/* Add more options as needed */}
          </select>
        </div>
        {/* Vendor Products */}
        <div>
          <label htmlFor="vendor-products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Vendor Products
          </label>
          <select
            id="vendor-products"
            defaultValue="Re-Order Level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Re-Order Level">Re-Order Level</option>
            <option value="Other">Other</option> {/* Add more options as needed */}
          </select>
        </div>
        {/* Attention */}
        <div>
          <label htmlFor="attention" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Attention
          </label>
          <input
            type="text"
            id="attention"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Reference */}
        <div>
          <label htmlFor="reference" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Reference
          </label>
          <select
            id="reference"
            defaultValue="TELEPHONIC"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="TELEPHONIC">TELEPHONIC</option>
            <option value="Other">Other</option> {/* Add more options as needed */}
          </select>
        </div>
        {/* Balance */}
        <div>
          <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Balance
          </label>
          <input
            type="text"
            id="balance"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* MR No */}
        <div>
          <label htmlFor="mr-no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            MR No
          </label>
          <input
            type="text"
            id="mr-no"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Own Products Only */}
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Own Products Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormGrid;