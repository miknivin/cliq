/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useCreateCategoryMutation } from "@/app/redux/api/masters/categoryApi";

interface Category {
  _id: string;
  code: string;
  name: string;
  parentCategory?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface CategoryFormProps {
  onClose: () => void;
}

const INPUT_CLASS =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const ERROR_CLASS = "mt-1 text-sm text-red-600 dark:text-red-400";
const LABEL_CLASS = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

export default function CategoryForm({ onClose }: CategoryFormProps) {
  const [formData, setFormData] = useState<Omit<Category, "_id" | "createdAt" | "updatedAt">>({
    code: "",
    name: "",
    parentCategory: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<{ code?: string; name?: string }>({});
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active",
    }));
  };

  const validateForm = () => {
    const newErrors: { code?: string; name?: string } = {};
    if (!formData.code) {
      newErrors.code = "Code is required";
    }
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await createCategory({
        code: formData.code,
        name: formData.name,
        parentCategory: formData.parentCategory || undefined,
        status: formData.status,
      }).unwrap();

      // Reset form
      setFormData({ code: "", name: "", parentCategory: "", status: "Active" });
      setErrors({});
      // Close modal
      onClose();
    } catch (err) {
      console.error('Error creating category:', err);
      setErrors({ name: (err as any).data?.message || 'Failed to create category' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 "
    >
      {/* Code */}
      <div>
        <label className={LABEL_CLASS}>Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className={`${INPUT_CLASS} ${errors.code ? "border-red-500" : ""}`}
          placeholder="Enter Category Code"
          disabled={isLoading}
        />
        {errors.code && <p className={ERROR_CLASS}>{errors.code}</p>}
      </div>

      {/* Name */}
      <div>
        <label className={LABEL_CLASS}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${INPUT_CLASS} ${errors.name ? "border-red-500" : ""}`}
          placeholder="Enter Category Name"
          disabled={isLoading}
        />
        {errors.name && <p className={ERROR_CLASS}>{errors.name}</p>}
      </div>

      {/* Parent Category */}
      <div>
        <label htmlFor="parentCategory" className={LABEL_CLASS}>
          Parent Category (Optional)
        </label>
        <select
          id="parentCategory"
          name="parentCategory"
          value={formData.parentCategory}
          onChange={handleChange}
          className={INPUT_CLASS}
          disabled={isLoading}
        >
          <option value="">Select a parent category (optional)</option>
          {/* Parent categories would be populated from API data in a real application */}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className={LABEL_CLASS}>Status</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.status === "Active"}
            onChange={handleStatusToggle}
            className="sr-only peer"
            disabled={isLoading}
          />
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
              dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
              peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
              dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
          />
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {formData.status}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 "
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Category"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>

      {/* API Error */}
      {error && (
        <p className={ERROR_CLASS}>
          {(error as any).data?.message || "Failed to create category"}
        </p>
      )}
    </form>
  );
}