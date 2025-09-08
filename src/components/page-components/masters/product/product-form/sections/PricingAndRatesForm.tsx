import { PricingAndRates } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";

interface PricingAndRatesFormProps {
  data: PricingAndRates;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PricingAndRatesForm = ({ data, handleChange }: PricingAndRatesFormProps) => {
  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Pricing and Rates</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Profit %</label>
          <input
            type="number"
            name="pricingAndRates.profitPercentage"
            value={data.profitPercentage}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>PRate</label>
          <input
            type="number"
            name="pricingAndRates.pRate"
            value={data.pRate}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Cost</label>
          <input
            type="number"
            name="pricingAndRates.cost"
            value={data.cost}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>SRate</label>
          <input
            type="number"
            name="pricingAndRates.sRate"
            value={data.sRate}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>NRate</label>
          <input
            type="number"
            name="pricingAndRates.nRate"
            value={data.nRate}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>MRP</label>
          <input
            type="number"
            name="pricingAndRates.mrp"
            value={data.mrp}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>WRate</label>
          <input
            type="number"
            name="pricingAndRates.wRate"
            value={data.wRate}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingAndRatesForm;