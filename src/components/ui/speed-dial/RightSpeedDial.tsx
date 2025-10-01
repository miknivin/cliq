"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import { addItem, removeItem } from "@/app/redux/slices/purchase-order/purchaseOrderSlice";

const SpeedDialMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.purchaseOrderForm.items);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdd = () => {
    dispatch(addItem());
  };

  const handleRemove = () => {
    if (items.length > 0) {
      const lastItemId = items[items.length - 1].id;
      dispatch(removeItem(lastItemId));
    }
    // Close menu after action
  };

  return (
    <div data-dial-init className="fixed end-6 bottom-6 group">
      <div
        id="speed-dial-menu-default"
        className={`flex flex-col items-center mb-4 space-y-2 transition-all duration-300 ${
          isMenuOpen ? "visible opacity-100 translate-y-0" : "hidden opacity-0 translate-y-2"
        }`}
      >
        <button
          type="button"
          data-tooltip-target="tooltip-add"
          data-tooltip-placement="left"
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          onClick={handleAdd}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 1v16M1 9h16" />
          </svg>
          <span className="sr-only">Add</span>
        </button>
        <div
          id="tooltip-add"
          role="tooltip"
          className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
        >
          Add
          <div className="tooltip-arrow" data-popper-arrow />
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-remove"
          data-tooltip-placement="left"
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-xs dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          onClick={handleRemove}
          disabled={items.length <= 1}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M1 9h16" />
          </svg>
          <span className="sr-only">Remove</span>
        </button>
        <div
          id="tooltip-remove"
          role="tooltip"
          className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
        >
          Remove
          <div className="tooltip-arrow" data-popper-arrow />
        </div>
      </div>
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded={isMenuOpen}
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        onClick={toggleMenu}
      >
        <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
        >
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>

        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
};

export default SpeedDialMenu;