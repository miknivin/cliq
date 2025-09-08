import { ProductFormState } from '@/app/redux/slices/masters/productFormSlice';

interface ValidationError {
  field: string;
  message: string;
}

export const validateProductForm = (data: ProductFormState): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate basicProductInfo
  if (!data.basicProductInfo.code.trim()) {
    errors.push({ field: 'basicProductInfo.code', message: 'Product code is required' });
  }
  if (!data.basicProductInfo.name.trim()) {
    errors.push({ field: 'basicProductInfo.name', message: 'Product name is required' });
  }

  // Validate pricingAndRates
  if (data.pricingAndRates.profitPercentage < 0) {
    errors.push({ field: 'pricingAndRates.profitPercentage', message: 'Profit percentage must be non-negative' });
  }
  if (data.pricingAndRates.pRate < 0) {
    errors.push({ field: 'pricingAndRates.pRate', message: 'PRate must be non-negative' });
  }
  if (data.pricingAndRates.cost < 0) {
    errors.push({ field: 'pricingAndRates.cost', message: 'Cost must be non-negative' });
  }
  if (data.pricingAndRates.sRate < 0) {
    errors.push({ field: 'pricingAndRates.sRate', message: 'SRate must be non-negative' });
  }
  if (data.pricingAndRates.nRate < 0) {
    errors.push({ field: 'pricingAndRates.nRate', message: 'NRate must be non-negative' });
  }
  if (data.pricingAndRates.mrp < 0) {
    errors.push({ field: 'pricingAndRates.mrp', message: 'MRP must be non-negative' });
  }
  if (data.pricingAndRates.wRate < 0) {
    errors.push({ field: 'pricingAndRates.wRate', message: 'WRate must be non-negative' });
  }

  // Validate stockAndMeasurement

  if (!data.stockAndMeasurement.base.trim()) {
    errors.push({ field: 'stockAndMeasurement.base', message: 'Base unit is required' });
  }
  if (!data.stockAndMeasurement.purchase.trim()) {
    errors.push({ field: 'stockAndMeasurement.purchase', message: 'Purchase unit is required' });
  }
  if (!data.stockAndMeasurement.sales.trim()) {
    errors.push({ field: 'stockAndMeasurement.sales', message: 'Sales unit is required' });
  }
  if (!data.stockAndMeasurement.stock.trim()) {
    errors.push({ field: 'stockAndMeasurement.stock', message: 'Stock unit is required' });
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

  // Validate productProperties.generalSettings
  if (data.productProperties.generalSettings.expiry < 0) {
    errors.push({ field: 'productProperties.generalSettings.expiry', message: 'Expiry must be non-negative' });
  }

  // Validate productProperties.categorization
  if (!data.productProperties.categorization.group.trim()) {
    errors.push({ field: 'productProperties.categorization.property', message: 'Property is required' });
  }
  if (!data.productProperties.categorization.subGroup.trim()) {
    errors.push({ field: 'productProperties.categorization.subProperty', message: 'Sub-property is required' });
  }
  if (!data.productProperties.categorization.vendor.trim()) {
    errors.push({ field: 'productProperties.categorization.vendor', message: 'Vendor is required' });
  }
  if (!data.productProperties.categorization.brand.trim()) {
    errors.push({ field: 'productProperties.categorization.brand', message: 'Brand is required' });
  }

  // Validate additionalDetails
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