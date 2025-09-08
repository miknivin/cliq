/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";
import FormSection from "../shared/FormSection";

interface OtherProps {
  control: any;
  errors: any;
}

const Other: React.FC<OtherProps> = ({ control, errors }) => (
  <FormSection title="Other">
    <div className="col-span-2">
      <InputField label="Company" name="other.company" control={control} errors={errors.other?.company} />
    </div>
  </FormSection>
);

export default Other;