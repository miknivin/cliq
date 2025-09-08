/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RootState } from "@/app/redux/rootReducer";
import { ProductFormState, resetForm, updateField } from "@/app/redux/slices/masters/productFormSlice";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicProductInfoForm from "./sections/BasicProductInfoForm";
import PricingAndRatesForm from "./sections/PricingAndRatesForm";
import StockAndMeasurementForm from "./sections/StockAndMeasurementForm";
import GeneralSettingsForm from "./sections/GeneralSettingsForm";
import CategorizationForm from "./sections/Categorization";
import AdditionalDetailsForm from "./sections/AdditionalDetailsForm";
import { validateProductForm } from "@/lib/validators/productValidation";
import { useCreateProductMutation } from "@/app/redux/api/masters/productApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.productForm || {
    basicProductInfo: { code: '', name: '', otherLanguage: '', taxGroup: '' },
    pricingAndRates: { profitPercentage: 0, pRate: 0, cost: 0, sRate: 0, nRate: 0, mrp: 0, wRate: 0 },
    stockAndMeasurement: { uom: '', base: '', purchase: '', sales: '', stock: '', openingStock: 0, minimumStock: 0, maximumStock: 0, reOrderLevel: 0, reOrderQty: '' },
    productProperties: {
      generalSettings: { inactive: false, lessProfit: false, counterItem: false, autoEntry: false, hideFromDevice: false, expiry: 0, taxInclusive: false, serialNo: false },
      categorization: { property: '', subProperty: '', vendor: '', brand: '' },
    },
    additionalDetails: { packUnit: 0, additionPercentage: 0, addition: 0, company: '', whStock: '' },
  });
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    const [section, ...fieldParts] = name.split(".");
    const field = fieldParts.join(".");
    dispatch(
      updateField({
        section: section as keyof ProductFormState,
        field,
        value: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || 0 : value || '',
      })
    );
  };

  useEffect(() => {
    let toastId: string | number | undefined;

    if (isLoading) {
      toastId = toast.loading("Submitting product...", { position: "top-right" });
    } else if (isSuccess) {
      toast.update(toastId as string | number, {
        render: "Product created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      router.push('/masters/product');
      dispatch(resetForm());
      setErrors([]);
    } else if (error) {
      toast.update(toastId as string | number, {
        render: (error as any)?.data?.message || "Failed to create product",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isLoading, isSuccess, error, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Client-side validation
    const validationErrors = validateProductForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach((err) =>
        toast.error(`${err.field || 'Error'}: ${err.message}`, { position: "top-right" })
      );
      return;
    }

    try {
      // Submit to API using RTK Query
      await createProduct(formData).unwrap();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
    setErrors([]);
    toast.info("Form reset successfully", { position: "top-right" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
    >
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.field || 'Error'}: {error.message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <BasicProductInfoForm
            data={formData.basicProductInfo}
            handleChange={handleChange}
          />
          <PricingAndRatesForm
            data={formData.pricingAndRates}
            handleChange={handleChange}
          />
          <GeneralSettingsForm
            data={formData.productProperties.generalSettings}
            handleChange={handleChange}
          />
        </div>
        <div className="space-y-5">
          <StockAndMeasurementForm
            onCreateUOM={() => console.log("create requested")}
            data={formData.stockAndMeasurement}
            handleChange={handleChange}
          />
          <CategorizationForm
            onCreateVendor={() => console.log("Vendor creation requested")}
            onCreateCategory={() => console.log("create requested")}
            data={formData.productProperties.categorization}
            handleChange={handleChange}
          />
          <AdditionalDetailsForm
            data={formData.additionalDetails}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8 gap-4 w-full dark:bg-gray-900 rounded-lg bg-gray-25 py-3 px-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;