/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";
import FormSection from "../shared/FormSection";

interface BankDetailsProps {
  control: any;
  errors: any;
}

const BankDetails: React.FC<BankDetailsProps> = ({ control, errors }) => (
  <FormSection title="Bank Details">
    <div className="col-span-2">
      <InputField label="Bank Details" name="bankDetails.bankDetails" control={control} errors={errors.bankDetails?.bankDetails} />
    </div>
    <div className="col-span-2">
        <InputField label="A/C No" name="bankDetails.accountNo" control={control} errors={errors.bankDetails?.accountNo} />
    </div>
    <div className="col-span-2">
      <InputField label="Bank Address" name="bankDetails.bankAddress" control={control} errors={errors.bankDetails?.bankAddress} />
    </div>
  </FormSection>
);

export default BankDetails;