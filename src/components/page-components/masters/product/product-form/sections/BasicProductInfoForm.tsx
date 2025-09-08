/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasicProductInfo } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";

interface BasicProductInfoFormProps {
  data: BasicProductInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BasicProductInfoForm = ({ data, handleChange }: BasicProductInfoFormProps) => {
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
          <input
            type="text"
            name="basicProductInfo.taxGroup"
            value={data.taxGroup}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicProductInfoForm;