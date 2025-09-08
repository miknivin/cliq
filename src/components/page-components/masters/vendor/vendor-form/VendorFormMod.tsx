/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useCreateVendorMutation } from "@/app/redux/api/masters/vendorApi";
import { useDispatch } from "react-redux";
import { resetForm } from "@/app/redux/slices/masters/vendorFormSlice";
import { IVendorForm } from "@/app/redux/slices/masters/vendorFormSlice";
import { validateVendor } from "@/lib/validators/vendorValidation";
import BasicInfo from "./sections/BasicInfo";
import AddressAndContact from "./sections/AddressAndContact";
import CreditAndFinance from "./sections/CreditAndFinance";
import TaxAndCompliance from "./sections/TaxAndCompliance";
import BankDetails from "./sections/BankDetails";
import Other from "./sections/Other";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ValidationErrorFrontend {
  field: string;
  error: string;
}

const VendorForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
  const [createVendor, { isLoading, error: apiError }] = useCreateVendorMutation();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IVendorForm>({
    defaultValues: {
      basicInfo: { code: "", name: "", under: "", openingBalance: 0 },
      addressAndContact: { contactName: "", nameInOL: "", address: "", phone: "", mobile: "", email: "", web: "", fax: "" },
      creditAndFinance: { creditLimit: 0, dueDays: 0, currency: "", paymentTerms: "", remark: "" },
      taxAndCompliance: { gstin: "", tin: "" },
      bankDetails: { bankDetails: "", accountNo: "", bankAddress: "" },
      other: { company: "" },
    },
  });

  const handleNoMatchClick = (field: string) => {
    alert(`No matches found for ${field}. Please enter a valid value or add a new option.`);
  };

  const onSubmit = async (data: IVendorForm) => {
    const errors = validateVendor(data, "frontend") as ValidationErrorFrontend[];
    if (errors.length > 0) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }
    try {
      const result = await createVendor(data).unwrap();
      toast.success(result.message);
      dispatch(resetForm());
      reset();
      router.push("/masters/vendor");
    } catch (err: any) {
      toast.error(`Failed to save vendor: ${err.data?.message || "Unknown error"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Vendor Master</h1>
      {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          API Error: {(apiError as any).data?.message || "An unexpected error occurred"}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <BasicInfo control={control} errors={errors} onNoMatchClick={handleNoMatchClick} />
          <AddressAndContact control={control} errors={errors} />
        </div>
        <div className="space-y-5">
          <CreditAndFinance control={control} errors={errors} onNoMatchClick={handleNoMatchClick} />
          <TaxAndCompliance control={control} errors={errors} />
          <BankDetails control={control} errors={errors} />
          <Other control={control} errors={errors} />
        </div>
      </div>
      <div className="flex justify-end mt-8 gap-4 w-full dark:bg-gray-900 rounded-lg bg-gray-25 py-3 px-2">
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
          onClick={() => {
            dispatch(resetForm());
            reset();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;