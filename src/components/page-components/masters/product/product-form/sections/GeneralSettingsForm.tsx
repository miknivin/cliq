"use client";

import { GeneralSettings } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS, TOGGLE_SWITCH_CLASS, TOGGLE_LABEL_CLASS } from "@/app/constants/sharedClasses";

interface GeneralSettingsFormProps {
  data: GeneralSettings;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const GeneralSettingsForm = ({ data, handleChange }: GeneralSettingsFormProps) => {
  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>General Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.inactive"
              checked={data.inactive }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Inactive</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.lessProfit"
              checked={data.lessProfit }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Less Profit</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.counterItem"
              checked={data.counterItem }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Counter Item</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.autoEntry"
              checked={data.autoEntry }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Auto Entry</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.hideFromDevice"
              checked={data.hideFromDevice }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Hide From Device</span>
          </label>
        </div>
        <div>
          <label className={LABEL_CLASS}>Expiry</label>
          <input
            type="number"
            name="productProperties.generalSettings.expiry"
            value={data.expiry}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.taxInclusive"
              checked={data.taxInclusive }
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Tax Inclusive</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="productProperties.generalSettings.serialNo"
              checked={data.serialNo}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={TOGGLE_SWITCH_CLASS} />
            <span className={TOGGLE_LABEL_CLASS}>Serial No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsForm;