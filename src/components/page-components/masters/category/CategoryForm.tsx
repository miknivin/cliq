"use client";
import React, { useState } from "react";

interface Category {
  id: number;
  code: string;
  name: string;
  parentCategory?: string;
  status: "Active" | "Inactive";
}

interface CategoryFormProps {
  onClose: () => void; // ✅ added prop
}

export default function CategoryForm({ onClose }: CategoryFormProps) {
  // Hardcoded categories
  const categories: Category[] = [
    { id: 1, code: "ELEC", name: "Electronics", status: "Active" },
    { id: 2, code: "FASH", name: "Fashion", status: "Active" },
    { id: 3, code: "HOME", name: "Home Appliances", status: "Inactive" },
  ];

  const [formData, setFormData] = useState<Omit<Category, "id">>({
    code: "",
    name: "",
    parentCategory: "",
    status: "Active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      alert("Code and Name are required");
      return;
    }

    console.log("New Category:", {
      id: Date.now(),
      ...formData,
      parentCategory: formData.parentCategory || undefined,
    });

    // ✅ reset form
    setFormData({ code: "", name: "", parentCategory: "", status: "Active" });

    // ✅ close modal after submit
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl bg-white dark:bg-white/[0.03] dark:border-white/[0.05] shadow"
    >
      {/* Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Code
        </label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Enter Category Code"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 dark:bg-gray-800 dark:text-white"
          placeholder="Enter Category Name"
        />
      </div>

      {/* Parent Category (Dropdown) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Parent Category (Optional)
        </label>
        <select
          name="parentCategory"
          value={formData.parentCategory}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">-- None --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none"
        >
          Add Category
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
