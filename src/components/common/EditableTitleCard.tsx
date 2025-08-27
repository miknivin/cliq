"use client"
import React, { useState } from "react";


interface EditableTitleCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const EditableTitleCard: React.FC<EditableTitleCardProps> = ({
  title,
  children,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const url = new URL(window.location.href);
    url.searchParams.set("title", editedTitle);
    window.history.pushState({}, "", url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="px-3 py-2 flex items-center justify-start gap-2">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleInputChange}
            onBlur={handleSaveClick}
            onKeyPress={(e) => e.key === "Enter" && handleSaveClick()}
            autoFocus
            className="text-base font-medium text-gray-800 dark:text-white/90 border border-gray-300 rounded-lg p-1"
          />
        ) : (
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
        )}
        {!isEditing && (
          <button onClick={handleEditClick} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
                </svg>

          </button>
        )}
      </div>
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 sm:p-3">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default EditableTitleCard;