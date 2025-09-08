import React from 'react';

const GeneralForm = () => {
  const inputClass = "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

  return (
    <div className="p-2 border-t">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Shipping Code</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>No</label>
            <input
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tax</label>
            <select
              className={inputClass}
            >
              <option value="afterDiscount">After Discount</option>
            </select>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                InterState
              </span>
            </label>
          </div>
        </div>
        <div>
          <label className={labelClass}>Notes</label>
          <textarea
            className={inputClass}
          />
        </div>
      </div>
      {/* <div className="mt-4 flex space-x-4">
        <div className="flex-1 text-green-600">0 : 0.00</div>
        <div className="flex-1 text-red-600">0.00</div>
        <div className="flex-1 text-blue-600">0.00</div>
        <div className="flex-1 text-red-600">0.00</div>
      </div> */}
    </div>
  );
};

export default GeneralForm;