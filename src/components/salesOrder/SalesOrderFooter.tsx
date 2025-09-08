import React from 'react';
import TabsComponent from './SalesOrderTab';

const SalesOrderFooter = () => {
  const inputClass = "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

  return (
    <div className="flex flex-col p-4 border-t">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 border-r border-gray-300 dark:border-gray-600 pe-0.5">
          {/* Tabs component placeholder */}
          <TabsComponent />
        </div>
         <div className="col-span-1 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Vehicle No</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Total</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Card/Bank/UPI</label>
            <select
              className={inputClass}
            >
              <option value="none">(none)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Discount</label>
            <input
              type="text"
              className={inputClass}
              defaultValue="0"
            />
          </div>
          <div>
            <label className={labelClass}>SR</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Freight :</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>SO Advance</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Round Off</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Paid By</label>
            <select
              className={inputClass}
            >
              <option value="cash">Cash</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Net Total</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Balance</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
        </div>
      </div>
     <div className="flex justify-end space-x-2">
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Preview
        </button>
        <button
          className="flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save
        </button>
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Clear
        </button>
        <button
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SalesOrderFooter;