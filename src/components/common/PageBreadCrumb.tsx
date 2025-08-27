"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PageBreadcrumb = () => {
  const pathname = usePathname();
  // Split the pathname into segments and filter out empty segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <nav>
        <ol className="flex items-center gap-1.5">
          {/* Home link */}
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              {pathSegments.length > 0 && (
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          </li>
          {/* Dynamic breadcrumb segments */}
          {pathSegments.map((segment, index) => {
            // Construct the href for each segment
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            // Capitalize the segment for display
            const displaySegment = segment
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            const isLast = index === pathSegments.length - 1;

            return (
              <li
                key={href}
                className={`text-sm ${
                  isLast
                    ? "text-gray-800 dark:text-white/90"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {isLast ? (
                  displaySegment
                ) : (
                  <>
                    <Link
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                      href={href}
                    >
                      {displaySegment}
                      <svg
                        className="stroke-current"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                          stroke=""
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;