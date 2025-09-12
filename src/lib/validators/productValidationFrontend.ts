import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';

interface ValidationError {
  field: string;
  message: string;
}

export const validateProductFormFrontend = (data: ProductFormState): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.basicProductInfo.code.trim()) {
    errors.push({ field: 'basicProductInfo.code', message: 'Product code is required' });
  }
  if (!data.basicProductInfo.name.trim()) {
    errors.push({ field: 'basicProductInfo.name', message: 'Product name is required' });
  }
  if (data.basicProductInfo.taxGroup && !/^[0-9a-fA-F]{24}$/.test(data.basicProductInfo.taxGroup)) {
    errors.push({ field: 'basicProductInfo.taxGroup', message: 'Tax group must be a valid ID' });
  }

  if (data.pricingAndRates.profitPercentage < 0) {
    errors.push({ field: 'pricingAndRates.profitPercentage', message: 'Profit percentage must be non-negative' });
  }
  if (data.pricingAndRates.pRate < 0) {
    errors.push({ field: 'pricingAndRates.pRate', message: 'PRate must be non-negative' });
  }
  if (data.pricingAndRates.cost < 0) {
    errors.push({ field: 'pricingAndRates.cost', message: 'Cost must be non-negative' });
  }

  const uomFields: (keyof typeof data.stockAndMeasurement)[] = ['base', 'purchase', 'sales', 'stock'];
  for (const field of uomFields) {
    const value = data.stockAndMeasurement[field];
    if (!value || !/^[0-9a-fA-F]{24}$/.test(String(value))) {
      errors.push({ field: `stockAndMeasurement.${field}`, message: `${field} unit is required` });
    }
  }
  if (data.stockAndMeasurement.openingStock < 0) {
    errors.push({ field: 'stockAndMeasurement.openingStock', message: 'Opening stock must be non-negative' });
  }
  if (data.stockAndMeasurement.minimumStock < 0) {
    errors.push({ field: 'stockAndMeasurement.minimumStock', message: 'Minimum stock must be non-negative' });
  }
  if (data.stockAndMeasurement.maximumStock < 0) {
    errors.push({ field: 'stockAndMeasurement.maximumStock', message: 'Maximum stock must be non-negative' });
  }
  if (data.stockAndMeasurement.reOrderLevel < 0) {
    errors.push({ field: 'stockAndMeasurement.reOrderLevel', message: 'Reorder level must be non-negative' });
  }
  if (data.stockAndMeasurement.reOrderQty && data.stockAndMeasurement.reOrderQty < 0) {
    errors.push({ field: 'stockAndMeasurement.reOrderQty', message: 'Reorder quantity must be non-negative' });
  }

  if (data.productProperties.generalSettings.expiry < 0) {
    errors.push({ field: 'productProperties.generalSettings.expiry', message: 'Expiry must be non-negative' });
  }

  const categoryFields: (keyof typeof data.productProperties.categorization)[] = ['group', 'subGroup', 'vendor'];
  for (const field of categoryFields) {
    const value = data.productProperties.categorization[field];
    if (!value || !/^[0-9a-fA-F]{24}$/.test(value)) {
      errors.push({ field: `productProperties.categorization.${field}`, message: `${field} is required` });
    }
  }
  if (!data.productProperties.categorization.brand.trim()) {
    errors.push({ field: 'productProperties.categorization.brand', message: 'Brand is required' });
  }

  if (data.additionalDetails.packUnit < 0) {
    errors.push({ field: 'additionalDetails.packUnit', message: 'Pack unit must be non-negative' });
  }
  if (data.additionalDetails.additionPercentage < 0) {
    errors.push({ field: 'additionalDetails.additionPercentage', message: 'Addition percentage must be non-negative' });
  }
  if (data.additionalDetails.addition < 0) {
    errors.push({ field: 'additionalDetails.addition', message: 'Addition must be non-negative' });
  }

  return errors;
};