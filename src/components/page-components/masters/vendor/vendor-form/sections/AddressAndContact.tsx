/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";
import FormSection from "../shared/FormSection";

interface AddressAndContactProps {
  control: any;
  errors: any;
}

const AddressAndContact: React.FC<AddressAndContactProps> = ({ control, errors }) => (
  <FormSection title="Address & Contact">
    <InputField label="Name" name="addressAndContact.contactName" control={control} errors={errors.addressAndContact?.contactName} />
    <InputField label="Name in OL" name="addressAndContact.nameInOL" control={control} errors={errors.addressAndContact?.nameInOL} />
    <div className="col-span-2">
      <InputField label="Address" name="addressAndContact.address" control={control} errors={errors.addressAndContact?.address} required />
    </div>
    <InputField label="Phone" name="addressAndContact.phone" control={control} errors={errors.addressAndContact?.phone} required />
    <InputField label="Mobile No" name="addressAndContact.mobile" control={control} errors={errors.addressAndContact?.mobile} />
    <InputField label="Email" name="addressAndContact.email" type="email" control={control} errors={errors.addressAndContact?.email} required />
    <InputField label="Web" name="addressAndContact.web" control={control} errors={errors.addressAndContact?.web} />
    <InputField label="Fax" name="addressAndContact.fax" control={control} errors={errors.addressAndContact?.fax} />
  </FormSection>
);

export default AddressAndContact;