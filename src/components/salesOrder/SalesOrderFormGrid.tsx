"use client";
import React from 'react';

const SalesOrderFormGrid = () => {
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
            defaultValue="SL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="SL">SL</option>
            <option value="PH">PH</option>
            <option value="Other">Other</option>
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
            defaultValue="179"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {/* Customer */}
        <div>
          <label htmlFor="customer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Customer
          </label>
          <input
            type="text"
            id="customer"
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
            <option value="Card/Bank-UP">Card/Bank-UP</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
          </select>
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
        {/* Sales Man */}
        <div>
          <label htmlFor="sales-man" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sales Man
          </label>
          <input
            type="text"
            id="sales-man"
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
        {/* Rate Level */}
        <div>
          <label htmlFor="rate-level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Rate Level
          </label>
          <select
            id="rate-level"
            defaultValue="WRATE"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="WRATE">WRATE</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Quotation */}
        <div>
          <label htmlFor="quotation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quotation
          </label>
          <input
            type="text"
            id="quotation"
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
            <option value="USD">USD</option>
          </select>
        </div>
        {/* Note */}
            <div>
             <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Note
          </label>
          <textarea
            id="note"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SalesOrderFormGrid;