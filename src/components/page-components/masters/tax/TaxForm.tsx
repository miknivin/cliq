/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useCreateTaxMutation } from "@/app/redux/api/masters/taxApi";
import WhiteLoader from "@/components/ui/loaders/WhiteLoaders";
import { toast} from "react-toastify";

interface TaxFormProps {
  onClose: () => void;
}

export default function TaxForm({ onClose }: TaxFormProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"percentage" | "fixed" | "slab">("percentage");
  const [rate, setRate] = useState<number | "">("");
  const [slabs, setSlabs] = useState<{ fromAmount: number; toAmount: number; rate: number }[]>([]);
  const [status, setStatus] = useState<"Active" | "Inactive" | "Draft">("Active");
  const [error, setError] = useState<string | null>(null);

  const [createTax, { isLoading }] = useCreateTaxMutation();

  const handleAddSlab = () => {
    setSlabs([...slabs, { fromAmount: 0, toAmount: 0, rate: 0 }]);
  };

  const handleSlabChange = (index: number, field: string, value: number) => {
    const updatedSlabs = [...slabs];
    updatedSlabs[index] = { ...updatedSlabs[index], [field]: value };
    setSlabs(updatedSlabs);
  };

  const handleDeleteSlab = (index: number) => {
    setSlabs(slabs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload: any = { name, code, description, type, status };

      if (type === "slab") {
        payload.slabs = slabs;
      } else {
        payload.rate = rate;
      }

      await createTax(payload).unwrap();

      // Show success toast and close modal
      toast.success("Tax created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      // Reset form & close
      setName("");
      setCode("");
      setDescription("");
      setType("percentage");
      setRate("");
      setSlabs([]);
      setStatus("Active");
      onClose();
    } catch (err) {
      console.error("Error creating tax:", err);
      setError("Failed to create tax. Please try again.");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="mx-auto p-6 rounded-xl shadow-md max-h-[100dvh] overflow-y-auto">
        {/* Name */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Tax Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Code */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Tax Code"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Tax Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Type */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
            <option value="slab">Slab</option>
          </select>
        </div>

        {/* Rate (only for percentage/fixed) */}
        {type !== "slab" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Rate
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="Enter Tax Rate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        )}

        {/* Slabs (only for slab type) */}
        {type === "slab" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Slabs
            </label>
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div className="text-sm font-medium text-gray-900 dark:text-white">From</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">To</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Rate</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Action</div>
              {slabs.map((slab, index) => (
                <React.Fragment key={index}>
                  <input
                    type="number"
                    placeholder="From"
                    value={slab.fromAmount}
                    onChange={(e) =>
                      handleSlabChange(index, "fromAmount", Number(e.target.value))
                    }
                    className="p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="To"
                    value={slab.toAmount}
                    onChange={(e) =>
                      handleSlabChange(index, "toAmount", Number(e.target.value))
                    }
                    className="p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={slab.rate}
                    onChange={(e) =>
                      handleSlabChange(index, "rate", Number(e.target.value))
                    }
                    className="p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleDeleteSlab(index)}
                    className="flex items-center justify-center border border-red-500 rounded"
                  >
                    <svg
                      className="w-6 h-6 text-red-600 dark:text-red-500"
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
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                </React.Fragment>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddSlab}
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              + Add Slab
            </button>
          </div>
        )}

        {/* Status Toggle */}
        <div className="mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={status === "Active"}
              onChange={() =>
                setStatus((prev) =>
                  prev === "Active" ? "Inactive" : "Active"
                )
              }
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
            <span className="ml-3 text-gray-900 dark:text-white">{status}</span>
          </label>
        </div>

        {/* Error and Submit */}
        <div className="mb-6">
          {error && (
            <div className="mb-2 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? <WhiteLoader /> : "Save Tax"}
          </button>
        </div>
      </form>
    </div>
  );
}