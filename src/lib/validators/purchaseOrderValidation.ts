import { PurchaseOrderState } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';
import { Types } from 'mongoose';


// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// Validation function
export function validatePurchaseOrder(data: PurchaseOrderState): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required and must be a non-empty string' });
  }

  // Validate orderDetails
  if (!data.orderDetails) {
    errors.push({ field: 'orderDetails', message: 'Order details are required' });
  } else {
    if (!data.orderDetails.no || data.orderDetails.no.trim() === '') {
      errors.push({ field: 'orderDetails.no', message: 'Order number is required' });
    }
    const dates = [
      { field: 'orderDetails.date', value: data.orderDetails.date },
      { field: 'orderDetails.dueDate', value: data.orderDetails.dueDate },
      { field: 'orderDetails.deliveryDate', value: data.orderDetails.deliveryDate },
    ];
    for (const { field, value } of dates) {
      if (!value || isNaN(new Date(value).getTime())) {
        errors.push({ field, message: `${field.split('.')[1]} must be a valid ISO date` });
      }
    }
  }

  // Validate vendorInformation
  if (!data.vendorInformation) {
    errors.push({ field: 'vendorInformation', message: 'Vendor information is required' });
  } else if (!data.vendorInformation.vendor || !Types.ObjectId.isValid(data.vendorInformation.vendor)) {
    errors.push({ field: 'vendorInformation.vendor', message: 'Valid vendor ID is required' });
  }

  // Validate financialDetails
  if (!data.financialDetails) {
    errors.push({ field: 'financialDetails', message: 'Financial details are required' });
  } else {
    if (!data.financialDetails.paymentMode || data.financialDetails.paymentMode.trim() === '') {
      errors.push({ field: 'financialDetails.paymentMode', message: 'Payment mode is required' });
    }
    if (typeof data.financialDetails.creditLimit !== 'number' || data.financialDetails.creditLimit < 0) {
      errors.push({ field: 'financialDetails.creditLimit', message: 'Credit limit must be a non-negative number' });
    }
    if (!data.financialDetails.currency || data.financialDetails.currency.trim() === '') {
      errors.push({ field: 'financialDetails.currency', message: 'Currency is required' });
    }
    if (typeof data.financialDetails.balance !== 'number') {
      errors.push({ field: 'financialDetails.balance', message: 'Balance must be a number' });
    }
  }

  // Validate items
  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push({ field: 'items', message: 'At least one item is required' });
  } else {
    data.items.forEach((item, index) => {
      if (!item.particulars ) {
        errors.push({ field: `items[${index}].particulars`, message: `Item ${index + 1}: Valid product is required` });
      }
      if (!item.uom || !Types.ObjectId.isValid(item.uom)) {
        errors.push({ field: `items[${index}].uom`, message: `Item ${index + 1}: Valid UOM ID is required` });
      }
      if (typeof item.qty !== 'number' || item.qty <= 0) {
        errors.push({ field: `items[${index}].qty`, message: `Item ${index + 1}: Quantity must be a positive number` });
      }
      if (typeof item.rate !== 'number' || item.rate < 0) {
        errors.push({ field: `items[${index}].rate`, message: `Item ${index + 1}: Rate must be a non-negative number` });
      }
      // Validate item total consistency
      const expectedTotal = item.qty * item.rate - (item.discount || 0) + (item.tax || 0);
      if (typeof item.total === 'number' && Math.abs(item.total - expectedTotal) > 0.01) {
        errors.push({
          field: `items[${index}].total`,
          message: `Item ${index + 1}: Total (${item.total}) does not match expected value (${expectedTotal})`,
        });
      }
      // Optional fields validation
      if (typeof item.frate === 'number' && item.frate < 0) {
        errors.push({ field: `items[${index}].frate`, message: `Item ${index + 1}: Free rate must be non-negative` });
      }
      if (typeof item.foc === 'number' && item.foc < 0) {
        errors.push({ field: `items[${index}].foc`, message: `Item ${index + 1}: FOC must be non-negative` });
      }
      if (typeof item.gross === 'number' && item.gross < 0) {
        errors.push({ field: `items[${index}].gross`, message: `Item ${index + 1}: Gross must be non-negative` });
      }
      if (typeof item.discountPercent === 'number' && (item.discountPercent < 0 || item.discountPercent > 100)) {
        errors.push({ field: `items[${index}].discountPercent`, message: `Item ${index + 1}: Discount percent must be between 0 and 100` });
      }
      if (typeof item.discount === 'number' && item.discount < 0) {
        errors.push({ field: `items[${index}].discount`, message: `Item ${index + 1}: Discount must be non-negative` });
      }
      if (typeof item.taxPercent === 'number' && (item.taxPercent < 0 || item.taxPercent > 100)) {
        errors.push({ field: `items[${index}].taxPercent`, message: `Item ${index + 1}: Tax percent must be between 0 and 100` });
      }
      if (typeof item.tax === 'number' && item.tax < 0) {
        errors.push({ field: `items[${index}].tax`, message: `Item ${index + 1}: Tax must be non-negative` });
      }
    });
  }

  // Validate footer
  if (!data.footer) {
    errors.push({ field: 'footer', message: 'Footer is required' });
  } else {
    if (typeof data.footer.total !== 'number' || data.footer.total < 0) {
      errors.push({ field: 'footer.total', message: 'Total must be a non-negative number' });
    }
    if (typeof data.footer.discount !== 'number' || data.footer.discount < 0) {
      errors.push({ field: 'footer.discount', message: 'Discount must be a non-negative number' });
    }
    if (typeof data.footer.addition !== 'number' || data.footer.addition < 0) {
      errors.push({ field: 'footer.addition', message: 'Addition must be a non-negative number' });
    }
    if (typeof data.footer.advance !== 'number' || data.footer.advance < 0) {
      errors.push({ field: 'footer.advance', message: 'Advance must be a non-negative number' });
    }
    if (typeof data.footer.netTotal !== 'number' || data.footer.netTotal < 0) {
      errors.push({ field: 'footer.netTotal', message: 'Net total must be a non-negative number' });
    }
    // Validate total vs creditLimit
    if (data.financialDetails && data.footer.total === data.financialDetails.creditLimit) {
      errors.push({ field: 'footer.total', message: 'Total cannot equal credit limit' });
    }
    // Validate netTotal consistency
    const expectedNetTotal = data.footer.total - data.footer.discount + data.footer.addition - data.footer.advance;
    if (Math.abs(data.footer.netTotal - expectedNetTotal) > 0.01) {
      errors.push({
        field: 'footer.netTotal',
        message: `Net total (${data.footer.netTotal}) does not match expected value (${expectedNetTotal})`,
      });
    }
  }

  return errors;
}