/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import Autocomplete from "@/components/ui/auto-complete/CustomAutocomplete";

interface AutocompleteFieldProps {
  label: string;
  name: string;
  suggestions: string[];
  control: any;
  isLoading?:boolean | string;
  onNoMatchClick: (field: string) => void;
  onInput?: (value: string) => void; // 1. Add the new optional prop
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ 
  label, 
  name, 
  suggestions, 
  control, 
  onNoMatchClick,
  onInput ,
  isLoading=false
}) => (
  <div className="mb-6">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          data={suggestions}
          onNoMatchClick={() => onNoMatchClick(name)}
          value={field.value || ""}
          isLoading={isLoading}
          onChange={field.onChange}
          onInput={onInput} // 3. Pass it down to the Autocomplete component
        />
      )}
    />
  </div>
);

export default AutocompleteField;