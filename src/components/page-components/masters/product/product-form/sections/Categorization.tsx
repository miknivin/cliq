/* eslint-disable @typescript-eslint/no-explicit-any */
import { Categorization } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";
import { useGetCategoriesQuery } from "@/app/redux/api/masters/categoryApi";
import { useGetVendorsQuery } from "@/app/redux/api/masters/vendorApi";
import AutocompleteWithName from "@/components/ui/auto-complete/AutocompleteWithName";

interface CategorizationFormProps {
  data: Categorization;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCreateCategory: (field: string, value: string) => any;
  onCreateVendor: (value: string) => any;
}

const CategorizationForm = ({ data, handleChange, onCreateCategory, onCreateVendor }: CategorizationFormProps) => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: vendors, isLoading: vendorsLoading } = useGetVendorsQuery({});
  const categoryNames = categories?.map(category => category.name) || [];
  const vendorNames = (vendors?.vendors?.map(vendor => vendor?.basicInfo?.name).filter((name): name is string => typeof name === "string") || []);

  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Categorization</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Group</label>
          <AutocompleteWithName
            data={categoryNames}
            value={data.group}
            name="productProperties.categorization.group"
            onChange={handleChange}
            onNoMatchClick={() => onCreateCategory('group', data.group)}
            isLoading={categoriesLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Sub Group</label>
          <AutocompleteWithName
            data={categoryNames}
            value={data.subGroup}
            name="productProperties.categorization.subGroup"
            onChange={handleChange}
            onNoMatchClick={() => onCreateCategory('subGroup', data.subGroup)}
            isLoading={categoriesLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Vendor</label>
          <AutocompleteWithName
            data={vendorNames}
            value={data.vendor}
            name="productProperties.categorization.vendor"
            onChange={handleChange}
            onNoMatchClick={() => onCreateVendor(data.vendor)}
            isLoading={vendorsLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Brand</label>
          <input
            type="text"
            name="productProperties.categorization.brand"
            value={data.brand}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CategorizationForm;