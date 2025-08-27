import { IVendorForm } from '@/app/redux/slices/masters/vendorFormSlice';

interface ValidationError {
  error: string;
}

interface ValidationErrorFrontend {
  field: string;
  error: string;
}

// Validate vendor data
export function validateVendor(data: IVendorForm, context: 'frontend' | 'backend' = 'frontend'): ValidationErrorFrontend[] | ValidationError | null {
  const errors: ValidationErrorFrontend[] = [];

  // Validate required fields
  if (!data.basicInfo.code) {
    errors.push({ field: 'basicInfo.code', error: 'Code is required' });
  }
  if (!data.basicInfo.name) {
    errors.push({ field: 'basicInfo.name', error: 'Name is required' });
  }
  if (!data.addressAndContact.address) {
    errors.push({ field: 'addressAndContact.address', error: 'Address is required' });
  }
  if (!data.addressAndContact.phone) {
    errors.push({ field: 'addressAndContact.phone', error: 'Phone is required' });
  }
  if (!data.addressAndContact.email) {
    errors.push({ field: 'addressAndContact.email', error: 'Email is required' });
  }

  // Validate email format
  if (data.addressAndContact.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.addressAndContact.email)) {
      errors.push({ field: 'addressAndContact.email', error: 'Invalid email format' });
    }
  }

  // Validate numeric fields
  if (data.basicInfo.openingBalance && isNaN(Number(data.basicInfo.openingBalance))) {
    errors.push({ field: 'basicInfo.openingBalance', error: 'Opening balance must be a number' });
  }
  if (data.creditAndFinance.creditLimit && isNaN(Number(data.creditAndFinance.creditLimit))) {
    errors.push({ field: 'creditAndFinance.creditLimit', error: 'Credit limit must be a number' });
  }
  if (data.creditAndFinance.dueDays && isNaN(Number(data.creditAndFinance.dueDays))) {
    errors.push({ field: 'creditAndFinance.dueDays', error: 'Due days must be a number' });
  }

  // Return based on context
  if (context === 'frontend') {
    return errors.length > 0 ? errors : [];
  } else {
    return errors.length > 0 ? { error: errors[0].error } : null;
  }
}