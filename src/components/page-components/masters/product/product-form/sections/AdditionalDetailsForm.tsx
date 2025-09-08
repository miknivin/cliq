/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdditionalDetails } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";

interface AdditionalDetailsFormProps {
  data: AdditionalDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AdditionalDetailsForm = ({ data, handleChange }: AdditionalDetailsFormProps) => {
  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Additional Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Pack Unit</label>
          <input
            type="number"
            name="additionalDetails.packUnit"
            value={data.packUnit}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Addition %</label>
          <input
            type="number"
            name="additionalDetails.additionPercentage"
            value={data.additionPercentage}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Addition</label>
          <input
            type="number"
            name="additionalDetails.addition"
            value={data.addition}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Company</label>
          <input
            type="text"
            name="additionalDetails.company"
            value={data.company}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>WH Stock</label>
          <input
            type="text"
            name="additionalDetails.whStock"
            value={data.whStock}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsForm;