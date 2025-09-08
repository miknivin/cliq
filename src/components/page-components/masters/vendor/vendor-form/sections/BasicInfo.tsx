/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";

import FormSection from "../shared/FormSection";
import AutocompleteField from "../shared/AutoCompleteField";
import { UNDER_SUGGESTIONS } from "@/app/constants/vendorForm";

interface BasicInfoProps {
  control: any;
  errors: any;
  onNoMatchClick: (field: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ control, errors, onNoMatchClick }) => (
  <FormSection title="Basic Info">
    <InputField label="Code" name="basicInfo.code" control={control} errors={errors.basicInfo?.code} required />
    <InputField label="Name" name="basicInfo.name" control={control} errors={errors.basicInfo?.name} required />
    <AutocompleteField
      label="Under"
      name="basicInfo.under"
      suggestions={UNDER_SUGGESTIONS}
      control={control}
      onNoMatchClick={onNoMatchClick}
    />
    <InputField
      label="Opening Balance"
      name="basicInfo.openingBalance"
      type="number"
      control={control}
      errors={errors.basicInfo?.openingBalance}
    />
  </FormSection>
);

export default BasicInfo;