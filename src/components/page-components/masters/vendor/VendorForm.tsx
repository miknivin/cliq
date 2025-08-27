/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateVendorMutation } from "@/app/redux/api/masters/vendorApi";
import { RootState } from "@/app/redux/rootReducer";
import { resetForm, updateField } from "@/app/redux/slices/masters/vendorFormSlice";
import Autocomplete from "@/components/ui/auto-complete/CustomAutocomplete";
import { IVendor } from "@/lib/models/masters/Vendor";
import { validateVendor } from "@/lib/validators/vendorValidation";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


// Helper constants for styling
const INPUT_CLASS = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const ERROR_CLASS = "mt-1 text-sm text-red-600 dark:text-red-400";

interface ValidationErrorFrontend {
  field: string;
  error: string;
}

const VendorForm: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.vendor);
  const [createVendor, { isLoading, error: apiError }] = useCreateVendorMutation();
  const [validationErrors, setValidationErrors] = useState<ValidationErrorFrontend[]>([]);

  // Sample data for Autocomplete
  const underSuggestions = ['Supplier', 'Contractor', 'Service Provider', 'Distributor'];
  const currencySuggestions = ['USD', 'EUR', 'INR', 'GBP'];

  // Get error message for a specific field
  const getFieldError = (field: string) => {
    return validationErrors.find((err) => err.field === field)?.error;
  };

  // Define allowed section keys for the form
  type VendorFormSection = "basicInfo" | "addressAndContact" | "creditAndFinance" | "taxAndCompliance" | "bankDetails" | "other";

  // Handle input changes with validation
  const handleChange = (section: VendorFormSection, field: string, value: string | number) => {
    dispatch(updateField({ section, field, value }));
    // Validate on change
    const updatedData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    } as IVendor; // Ensure type safety

    setValidationErrors(validateVendor(updatedData, 'frontend') as ValidationErrorFrontend[]);
  };

  // Handle no match click for Autocomplete
  const handleNoMatchClick = (field: string) => {
    alert(`No matches found for ${field}. Please enter a valid value or add a new option.`);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateVendor(formData, 'frontend') as ValidationErrorFrontend[];
    setValidationErrors(errors);

    if (errors.length > 0) {
      alert('Please fix the form errors before submitting.');
      return;
    }

    try {
      const result = await createVendor(formData).unwrap();
      alert(result.message);
      dispatch(resetForm());
      setValidationErrors([]);
    } catch (err: any) {
      alert(`Failed to save vendor: ${err.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Vendor Master
      </h1>

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          API Error: {(apiError as any).data?.error || 'An unexpected error occurred'}
        </div>
      )}

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Basic Info */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Basic Info
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label htmlFor="code-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                <input
                  type="text"
                  id="code-input"
                  className={`${INPUT_CLASS} ${getFieldError('basicInfo.code') ? 'border-red-500' : ''}`}
                  value={formData.basicInfo.code}
                  onChange={(e) => handleChange('basicInfo', 'code', e.target.value)}
                  required
                />
                {getFieldError('basicInfo.code') && (
                  <p className={ERROR_CLASS}>{getFieldError('basicInfo.code')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="name-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  id="name-input"
                  className={`${INPUT_CLASS} ${getFieldError('basicInfo.name') ? 'border-red-500' : ''}`}
                  value={formData.basicInfo.name}
                  onChange={(e) => handleChange('basicInfo', 'name', e.target.value)}
                  required
                />
                {getFieldError('basicInfo.name') && (
                  <p className={ERROR_CLASS}>{getFieldError('basicInfo.name')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="under-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Under</label>
                <Autocomplete
                  data={underSuggestions}
                  onNoMatchClick={() => handleNoMatchClick('under')}
                  value={formData.basicInfo.under}
                  onChange={(value) => handleChange('basicInfo', 'under', value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="opening-balance-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opening Balance</label>
                <input
                  type="number"
                  id="opening-balance-input"
                  className={`${INPUT_CLASS} ${getFieldError('basicInfo.openingBalance') ? 'border-red-500' : ''}`}
                  value={formData.basicInfo.openingBalance}
                  onChange={(e) => handleChange('basicInfo', 'openingBalance', Number(e.target.value))}
                />
                {getFieldError('basicInfo.openingBalance') && (
                  <p className={ERROR_CLASS}>{getFieldError('basicInfo.openingBalance')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address & Contact */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Address & Contact
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label htmlFor="contact-name-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  id="contact-name-input"
                  className={INPUT_CLASS}
                  value={formData.addressAndContact.contactName}
                  onChange={(e) => handleChange('addressAndContact', 'contactName', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="name-ol-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name in OL</label>
                <input
                  type="text"
                  id="name-ol-input"
                  className={INPUT_CLASS}
                  value={formData.addressAndContact.nameInOL}
                  onChange={(e) => handleChange('addressAndContact', 'nameInOL', e.target.value)}
                />
              </div>
              <div className="mb-6 col-span-2">
                <label htmlFor="address-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input
                  type="text"
                  id="address-input"
                  className={`${INPUT_CLASS} ${getFieldError('addressAndContact.address') ? 'border-red-500' : ''}`}
                  value={formData.addressAndContact.address}
                  onChange={(e) => handleChange('addressAndContact', 'address', e.target.value)}
                  required
                />
                {getFieldError('addressAndContact.address') && (
                  <p className={ERROR_CLASS}>{getFieldError('addressAndContact.address')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input
                  type="text"
                  id="phone-input"
                  className={`${INPUT_CLASS} ${getFieldError('addressAndContact.phone') ? 'border-red-500' : ''}`}
                  value={formData.addressAndContact.phone}
                  onChange={(e) => handleChange('addressAndContact', 'phone', e.target.value)}
                  required
                />
                {getFieldError('addressAndContact.phone') && (
                  <p className={ERROR_CLASS}>{getFieldError('addressAndContact.phone')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="mobile-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No</label>
                <input
                  type="text"
                  id="mobile-input"
                  className={INPUT_CLASS}
                  value={formData.addressAndContact.mobile}
                  onChange={(e) => handleChange('addressAndContact', 'mobile', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  id="email-input"
                  className={`${INPUT_CLASS} ${getFieldError('addressAndContact.email') ? 'border-red-500' : ''}`}
                  value={formData.addressAndContact.email}
                  onChange={(e) => handleChange('addressAndContact', 'email', e.target.value)}
                  required
                />
                {getFieldError('addressAndContact.email') && (
                  <p className={ERROR_CLASS}>{getFieldError('addressAndContact.email')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="web-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Web</label>
                <input
                  type="text"
                  id="web-input"
                  className={INPUT_CLASS}
                  value={formData.addressAndContact.web}
                  onChange={(e) => handleChange('addressAndContact', 'web', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="fax-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fax</label>
                <input
                  type="text"
                  id="fax-input"
                  className={INPUT_CLASS}
                  value={formData.addressAndContact.fax}
                  onChange={(e) => handleChange('addressAndContact', 'fax', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Credit & Finance */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Credit & Finance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label htmlFor="credit-limit-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit Limit</label>
                <input
                  type="number"
                  id="credit-limit-input"
                  className={`${INPUT_CLASS} ${getFieldError('creditAndFinance.creditLimit') ? 'border-red-500' : ''}`}
                  value={formData.creditAndFinance.creditLimit}
                  onChange={(e) => handleChange('creditAndFinance', 'creditLimit', Number(e.target.value))}
                />
                {getFieldError('creditAndFinance.creditLimit') && (
                  <p className={ERROR_CLASS}>{getFieldError('creditAndFinance.creditLimit')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="due-days-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Days</label>
                <input
                  type="number"
                  id="due-days-input"
                  className={`${INPUT_CLASS} ${getFieldError('creditAndFinance.dueDays') ? 'border-red-500' : ''}`}
                  value={formData.creditAndFinance.dueDays}
                  onChange={(e) => handleChange('creditAndFinance', 'dueDays', Number(e.target.value))}
                />
                {getFieldError('creditAndFinance.dueDays') && (
                  <p className={ERROR_CLASS}>{getFieldError('creditAndFinance.dueDays')}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="currency-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                <Autocomplete
                  data={currencySuggestions}
                  onNoMatchClick={() => handleNoMatchClick('currency')}
                  value={formData.creditAndFinance.currency}
                  onChange={(value) => handleChange('creditAndFinance', 'currency', value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="payment-terms-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Terms</label>
                <input
                  type="text"
                  id="payment-terms-input"
                  className={INPUT_CLASS}
                  value={formData.creditAndFinance.paymentTerms}
                  onChange={(e) => handleChange('creditAndFinance', 'paymentTerms', e.target.value)}
                />
              </div>
              <div className="mb-6 col-span-2">
                <label htmlFor="remark-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remark</label>
                <input
                  type="text"
                  id="remark-input"
                  className={INPUT_CLASS}
                  value={formData.creditAndFinance.remark}
                  onChange={(e) => handleChange('creditAndFinance', 'remark', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tax & Compliance */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Tax & Compliance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label htmlFor="gstin-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GSTIN/UIN</label>
                <input
                  type="text"
                  id="gstin-input"
                  className={INPUT_CLASS}
                  value={formData.taxAndCompliance.gstin}
                  onChange={(e) => handleChange('taxAndCompliance', 'gstin', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="tin-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TIN</label>
                <input
                  type="text"
                  id="tin-input"
                  className={INPUT_CLASS}
                  value={formData.taxAndCompliance.tin}
                  onChange={(e) => handleChange('taxAndCompliance', 'tin', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Bank Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 col-span-2">
                <label htmlFor="bank-details-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Details</label>
                <input
                  type="text"
                  id="bank-details-input"
                  className={INPUT_CLASS}
                  value={formData.bankDetails.bankDetails}
                  onChange={(e) => handleChange('bankDetails', 'bankDetails', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="account-no-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">A/C No</label>
                <input
                  type="text"
                  id="account-no-input"
                  className={INPUT_CLASS}
                  value={formData.bankDetails.accountNo}
                  onChange={(e) => handleChange('bankDetails', 'accountNo', e.target.value)}
                />
              </div>
              <div className="mb-6 col-span-2">
                <label htmlFor="bank-address-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Address</label>
                <input
                  type="text"
                  id="bank-address-input"
                  className={INPUT_CLASS}
                  value={formData.bankDetails.bankAddress}
                  onChange={(e) => handleChange('bankDetails', 'bankAddress', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Other */}
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Other
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6 col-span-2">
                <label htmlFor="company-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                <input
                  type="text"
                  id="company-input"
                  className={INPUT_CLASS}
                  value={formData.other.company}
                  onChange={(e) => handleChange('other', 'company', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8 gap-4">
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
          onClick={() => {
            dispatch(resetForm());
            setValidationErrors([]);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300"
          disabled={isLoading || validationErrors.length > 0}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;