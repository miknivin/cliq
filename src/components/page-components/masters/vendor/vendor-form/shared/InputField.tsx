/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_CLASS, INPUT_CLASS } from "@/app/constants/vendorForm";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  control: any;
  errors: any;
  required?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", control, errors, required }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          type={type}
          id={name}
          className={`${INPUT_CLASS} ${errors&& errors[name] ? "border-red-500" : ""}`}
          {...field}
          value={field.value || ""}
        />
      )}
    />
    {errors&& errors[name] && <p className={ERROR_CLASS}>{errors[name].message}</p>}
  </div>
);

export default InputField;