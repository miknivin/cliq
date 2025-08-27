"use client";

import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation';

// IconGrid component to display icons in a 4-column grid
const IconGrid = () => {
  const searchParams = useSearchParams();

  // Function to create href with preserved query parameters
  const createHref = (basePath: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${basePath}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  return (
    <div className="container max-w-5xl mx-auto">
      <div className="grid grid-cols-4 gap-4 p-4 mx-auto">
        {/* Inventory Management Icon */}
        <Link
          href={createHref('/')}
          className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0H4"
            />
          </svg>
          <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Inventory Management
          </span>
        </Link>

        {/* Accounts Icon */}
        <Link
          href={createHref('/')}
          className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Accounts
          </span>
        </Link>

        {/* HRM Icon */}
        <Link
          href={createHref('/')}
          className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <svg
            className="w-12 h-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            HRM
          </span>
        </Link>
      </div>
    </div>
  );
};

export default IconGrid;