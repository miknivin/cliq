/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";
import FormSection from "../shared/FormSection";

interface TaxAndComplianceProps {
  control: any;
  errors: any;
}

const TaxAndCompliance: React.FC<TaxAndComplianceProps> = ({ control, errors }) => (
  <FormSection title="Tax & Compliance">
    <InputField label="GSTIN/UIN" name="taxAndCompliance.gstin" control={control} errors={errors.taxAndCompliance?.gstin} />
    <InputField label="TIN" name="taxAndCompliance.tin" control={control} errors={errors.taxAndCompliance?.tin} />
  </FormSection>
);

export default TaxAndCompliance;