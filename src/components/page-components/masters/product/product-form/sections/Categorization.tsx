/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Categorization } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";
import { useGetCategoriesQuery } from "@/app/redux/api/masters/categoryApi";
import { useGetVendorsQuery } from "@/app/redux/api/masters/vendorApi";
import AutocompleteWithName from "@/components/ui/auto-complete/AutocompleteWithName";
import { useState, useEffect } from "react";

interface CategorizationFormProps {
  data: Categorization;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCreateCategory: (field: string, value: string) => any;
  onCreateVendor: (value: string) => any;
  errors: { field: string; message: string }[];
}

const CategorizationForm = ({ data, handleChange, onCreateCategory, onCreateVendor, errors }: CategorizationFormProps) => {
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery();
  const { data: vendors, isLoading: vendorsLoading, isError: vendorsError } = useGetVendorsQuery({});

  const categoryOptions = categories
    ?.filter(category => category.status === "Active")
    .map(category => ({ id: category._id, name: category.name })) || [];
  const vendorOptions = vendors?.vendors
    ?.filter(vendor => vendor && vendor.status === "Active")
    .map(vendor => vendor ? { id: vendor._id, name: vendor.basicInfo.name } : null)
    .filter((v): v is { id: string; name: string } => v !== null) || [];

  const getCategoryName = (id: string) => categoryOptions.find(category => category.id === id)?.name || '';
  const getVendorName = (id: string) => vendorOptions.find(vendor => vendor.id === id)?.name || '';

  // Local state to manage input display values
  const [groupInput, setGroupInput] = useState(getCategoryName(data.group));
  const [subGroupInput, setSubGroupInput] = useState(getCategoryName(data.subGroup));
  const [vendorInput, setVendorInput] = useState(getVendorName(data.vendor));

  // Sync local state with Redux state changes
  useEffect(() => {
    setGroupInput(getCategoryName(data.group));
    setSubGroupInput(getCategoryName(data.subGroup));
    setVendorInput(getVendorName(data.vendor));
  }, [data.group, data.subGroup, data.vendor]);

  // Handle selection (store _id in Redux)
  const handleCategoryChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const selectedCategory = categoryOptions.find(category => category.name === value);
    const syntheticEvent = {
      target: {
        name: `productProperties.categorization.${field}`,
        value: selectedCategory ? selectedCategory.id : '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
    // Update local input state
    if (field === 'group') setGroupInput(value);
    else setSubGroupInput(value);
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const selectedVendor = vendorOptions.find(vendor => vendor.name === value);
    const syntheticEvent = {
      target: {
        name: "productProperties.categorization.vendor",
        value: selectedVendor ? selectedVendor.id : '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
    setVendorInput(value);
  };

  // Handle typing (update local state only)
  const handleCategoryInput = (field: string) => (value: string) => {
    if (field === 'group') setGroupInput(value);
    else setSubGroupInput(value);
    // Clear Redux state for this field to avoid invalid _id
    const syntheticEvent = {
      target: {
        name: `productProperties.categorization.${field}`,
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  const handleVendorInput = (value: string) => {
    setVendorInput(value);
    // Clear Redux state for vendor to avoid invalid _id
    const syntheticEvent = {
      target: {
        name: "productProperties.categorization.vendor",
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  // Handle creation
  const handleCreateCategory = (field: string, value: string) => {
    onCreateCategory(field, value);
    // Optionally reset local input after creation
    if (field === 'group') setGroupInput('');
    else setSubGroupInput('');
  };

  const handleCreateVendor = (value: string) => {
    onCreateVendor(value);
    setVendorInput('');
  };

  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Categorization</h2>
      {(categoriesError || vendorsError) && (
        <p className="text-red-500">Error loading categories or vendors</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Group</label>
          <AutocompleteWithName
            data={categoryOptions.map(category => category.name)}
            value={groupInput}
            name="productProperties.categorization.group"
            onChange={handleCategoryChange('group')}
            onInput={handleCategoryInput('group')}
            onNoMatchClick={() => handleCreateCategory('group', groupInput)}
            isLoading={categoriesLoading}
          />
          {errors.find(e => e.field === 'productProperties.categorization.group') && (
            <p className="text-red-500 text-sm">{errors.find(e => e.field === 'productProperties.categorization.group')?.message}</p>
          )}
        </div>
        <div>
          <label className={LABEL_CLASS}>Sub Group</label>
          <AutocompleteWithName
            data={categoryOptions.map(category => category.name)}
            value={subGroupInput}
            name="productProperties.categorization.subGroup"
            onChange={handleCategoryChange('subGroup')}
            onInput={handleCategoryInput('subGroup')}
            onNoMatchClick={() => handleCreateCategory('subGroup', subGroupInput)}
            isLoading={categoriesLoading}
          />
          {errors.find(e => e.field === 'productProperties.categorization.subGroup') && (
            <p className="text-red-500 text-sm">{errors.find(e => e.field === 'productProperties.categorization.subGroup')?.message}</p>
          )}
        </div>
        <div>
          <label className={LABEL_CLASS}>Vendor</label>
          <AutocompleteWithName
            data={vendorOptions.map(vendor => vendor.name)}
            value={vendorInput}
            name="productProperties.categorization.vendor"
            onChange={handleVendorChange}
            onInput={handleVendorInput}
            onNoMatchClick={() => handleCreateVendor(vendorInput)}
            isLoading={vendorsLoading}
          />
          {errors.find(e => e.field === 'productProperties.categorization.vendor') && (
            <p className="text-red-500 text-sm">{errors.find(e => e.field === 'productProperties.categorization.vendor')?.message}</p>
          )}
        </div>
        <div>
          <label className={LABEL_CLASS}>Brand</label>
          <input
            type="text"
            name="productProperties.categorization.brand"
            value={data.brand || ''}
            onChange={handleChange}
            className={`${INPUT_CLASS} ${errors.some(e => e.field === 'productProperties.categorization.brand') ? 'border-red-500' : ''}`}
            required
          />
          {errors.find(e => e.field === 'productProperties.categorization.brand') && (
            <p className="text-red-500 text-sm">{errors.find(e => e.field === 'productProperties.categorization.brand')?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorizationForm;