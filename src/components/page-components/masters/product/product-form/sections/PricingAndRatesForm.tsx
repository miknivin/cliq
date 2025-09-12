import { PricingAndRates } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import { useGetTaxesQuery } from "@/app/redux/api/masters/taxApi";
import { useEffect, useMemo, useState } from "react";
import { Tax } from "@/app/redux/api/masters/taxApi";

interface PricingAndRatesFormProps {
  data: PricingAndRates;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PricingAndRatesForm = ({ data, handleChange }: PricingAndRatesFormProps) => {
  const taxGroup = useSelector((state: RootState) => state.productForm.basicProductInfo.taxGroup);
  const addition = useSelector((state: RootState) => state.productForm.additionalDetails.addition);
  const { data: taxes } = useGetTaxesQuery();

  // State for MRP validation error
  const [mrpError, setMrpError] = useState<string | null>(null);

  // Memoize tax options
  const taxOptions = useMemo(
    () =>
      taxes?.data
        ?.filter((tax: Tax) => tax.status === "Active")
        .map((tax: Tax) => ({ id: tax._id, name: tax.name, rate: tax.rate })) || [],
    [taxes]
  );

  // Get tax rate for the selected taxGroup
  const taxRate = useMemo(
    () => taxOptions.find(tax => tax.id === taxGroup)?.rate || 0,
    [taxOptions, taxGroup]
  );

  // Calculate cost and derived values
  useEffect(() => {
    const pRate = Number(data.pRate) || 0;
    const additionValue = Number(addition) || 0;
    const profitPercentage = Number(data.profitPercentage) || 0;

    // Calculate cost = pRate + addition
    const cost = pRate + additionValue;

    // Calculate derived values, default to 0 if invalid
    const sRate = cost > 0 && profitPercentage >= 0 ? cost * (1 + profitPercentage / 100) : 0;
    const nRate = sRate > 0 && taxRate > 0 ? sRate * (1 + taxRate / 100) : sRate;
    const wRate = cost > 0 && profitPercentage >= 0 ? cost * (1 + (profitPercentage * 0.8) / 100) : 0;

    // Update Redux state for cost and derived fields (exclude mrp)
    const fieldsToUpdate = [
      { name: "pricingAndRates.cost", value: cost.toFixed(2) },
      { name: "pricingAndRates.sRate", value: sRate.toFixed(2) },
      { name: "pricingAndRates.nRate", value: nRate.toFixed(2) },
      { name: "pricingAndRates.wRate", value: wRate.toFixed(2) },
    ];

    fieldsToUpdate.forEach(field => {
      const currentValue = Number(data[field.name.split('.')[1] as keyof PricingAndRates]);
      if (currentValue !== Number(field.value)) {
        const syntheticEvent = {
          target: {
            name: field.name,
            value: field.value,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        handleChange(syntheticEvent);
      }
    });

    // Validate mrp > nRate
    const mrpValue = Number(data.mrp);
    const nRateValue = Number(nRate.toFixed(2));
    if (mrpValue > 0 && mrpValue <= nRateValue) {
      setMrpError("MRP must be greater than Net Rate");
    } else {
      setMrpError(null);
    }
  }, [data.pRate, addition, data.profitPercentage, taxRate, data.mrp, handleChange, data]);

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
            step="0.01"
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
            step="0.01"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Cost</label>
          <input
            type="number"
            name="pricingAndRates.cost"
            value={data.cost}
            className={`${INPUT_CLASS} bg-gray-100 cursor-not-allowed`}
            readOnly
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>SRate</label>
          <input
            type="number"
            name="pricingAndRates.sRate"
            value={data.sRate}
            className={`${INPUT_CLASS} bg-gray-100 cursor-not-allowed`}
            readOnly
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>NRate</label>
          <input
            type="number"
            name="pricingAndRates.nRate"
            value={data.nRate}
            className={`${INPUT_CLASS} bg-gray-100 cursor-not-allowed`}
            readOnly
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>MRP</label>
          <input
            type="number"
            name="pricingAndRates.mrp"
            value={data.mrp}
            onChange={handleChange}
            className={`${INPUT_CLASS} ${mrpError ? 'border-red-500' : ''}`}
            required
            min="0"
            step="0.01"
          />
          {mrpError && <p className="text-red-500 text-sm">{mrpError}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS}>WRate</label>
          <input
            type="number"
            name="pricingAndRates.wRate"
            value={data.wRate}
            className={`${INPUT_CLASS} bg-gray-100 cursor-not-allowed`}
            readOnly
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingAndRatesForm;