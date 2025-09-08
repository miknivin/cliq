/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_CLASS, INPUT_CLASS } from "@/app/constants/vendorForm";
import { Controller } from "react-hook-form";

interface TextAreaFieldProps {
  label: string;
  name: string;
  control: any;
  errors: any;
  required?: boolean;
  rows?: number; // Optional prop for number of rows in textarea
  cols?: number; // Optional prop for number of columns in textarea
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  control,
  errors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  required,
  rows = 2, // Default rows
  cols = 50, // Default cols
}) => (
  <div className="mb-6">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          id={name}
          className={`${INPUT_CLASS} ${errors && errors[name] ? "border-red-500" : ""}`}
          {...field}
          value={field.value || ""}
          rows={rows}
          cols={cols}
        />
      )}
    />
    {errors && errors[name] && <p className={ERROR_CLASS}>{errors[name].message}</p>}
  </div>
);

export default TextAreaField;