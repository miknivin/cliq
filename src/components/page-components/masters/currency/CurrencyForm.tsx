import React, { useState } from "react";
import { useCreateCurrencyMutation } from "@/app/redux/api/masters/currencyApi";

interface CurrencyFormProps {
  onClose: () => void;
}

export default function CurrencyForm({ onClose }: CurrencyFormProps) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [error, setError] = useState<string | null>(null);

  const [createCurrency, { isLoading }] = useCreateCurrencyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newCurrency = { code, name, symbol, status };

    try {
      await createCurrency(newCurrency).unwrap();
      // Reset form and close on success
      setCode("");
      setName("");
      setSymbol("");
      setStatus("Active");
      onClose();
    } catch (err) {
      setError("Failed to create currency. Please try again.");
      console.error("Error creating currency:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 rounded-xl shadow-md"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="code"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Code
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Currency Code (e.g., INR)"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      {/* Name Input */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Currency Name (e.g., Indian Rupee)"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      {/* Symbol Input */}
      <div className="mb-6">
        <label
          htmlFor="symbol"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Symbol
        </label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter Symbol (e.g., ₹, $, €)"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      {/* Status Toggle */}
      <div className="mb-6">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status === "Active"}
            onChange={() =>
              setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"))
            }
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
          />
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {status}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg 
          bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-600'}`}
      >
        {isLoading ? "Saving..." : "Save Currency"}
      </button>
    </form>
  );
}