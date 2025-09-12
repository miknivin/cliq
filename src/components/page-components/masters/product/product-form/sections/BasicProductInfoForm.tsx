import { BasicProductInfo } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";
import { useGetTaxesQuery } from "@/app/redux/api/masters/taxApi";
import Autocomplete from "@/components/ui/auto-complete/CustomAutocomplete";
import { useState, useEffect, useMemo } from "react";
import { Tax } from "@/app/redux/api/masters/taxApi";


interface BasicProductInfoFormProps {
  data: BasicProductInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCreateTax?: (value: string) => void; // Optional prop for creating new tax
}

const BasicProductInfoForm = ({ data, handleChange, onCreateTax }: BasicProductInfoFormProps) => {
  const { data: taxes, isLoading } = useGetTaxesQuery();

  // Memoize taxOptions to prevent recomputation on every render
const taxOptions = useMemo(
  () =>
    taxes?.data
      ?.filter((tax: Tax) => tax.status === "Active" && tax._id)
      .map((tax: Tax) => ({ id: tax._id!, name: tax.name })) || [],
  [taxes]
);

  // Local state for display value
  const [taxGroupInput, setTaxGroupInput] = useState(
    taxOptions.find(tax => tax.id === data.taxGroup)?.name || ''
  );

  // Sync local state with Redux state
  useEffect(() => {
    setTaxGroupInput(taxOptions.find(tax => tax.id === data.taxGroup)?.name || '');
  }, [data.taxGroup, taxOptions]);

  // Handle Autocomplete value change (store _id in Redux)
  const handleTaxGroupChange = (value: string) => {
    const selectedTax = taxOptions.find(tax => tax.name === value);
    const syntheticEvent = {
      target: {
        name: "basicProductInfo.taxGroup",
        value: selectedTax ? selectedTax.id : '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
    setTaxGroupInput(value); // Update display value
  };

  // Handle typing (update local state, clear Redux state)
  const handleTaxGroupInput = (value: string) => {
    setTaxGroupInput(value);
    // Clear Redux state to avoid invalid _id
    const syntheticEvent = {
      target: {
        name: "basicProductInfo.taxGroup",
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  // Handle "Add +" click for no matching tax group
  const handleNoMatchClick = () => {
    if (onCreateTax) {
      onCreateTax(taxGroupInput);
      setTaxGroupInput(''); // Reset input after creation
    } else {
      console.log("No matching tax group found. Open modal to add new tax group.");
    }
  };

  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Basic Product Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Code</label>
          <input
            type="text"
            name="basicProductInfo.code"
            value={data.code}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Name</label>
          <input
            type="text"
            name="basicProductInfo.name"
            value={data.name}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Other Language</label>
          <input
            type="text"
            name="basicProductInfo.otherLanguage"
            value={data.otherLanguage}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Tax Group</label>
          <Autocomplete
            data={taxOptions.map(tax => tax.name)}
            value={taxGroupInput}
            onChange={handleTaxGroupChange}
            onInput={handleTaxGroupInput}
            onNoMatchClick={handleNoMatchClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicProductInfoForm;