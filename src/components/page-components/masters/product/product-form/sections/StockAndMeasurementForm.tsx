/* eslint-disable @typescript-eslint/no-explicit-any */
import { StockAndMeasurement } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";


import { IUOM } from '@/lib/models/masters/Uom';
import { useGetUOMsQuery } from "@/app/redux/api/masters/uomApi";
import Autocomplete from "@/components/ui/auto-complete/CustomAutocomplete";

interface StockAndMeasurementFormProps {
  data: StockAndMeasurement;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCreateUOM: (field: string, value: string) => any;
}

const StockAndMeasurementForm = ({ data, handleChange, onCreateUOM }: StockAndMeasurementFormProps) => {
  const { data: uomData, isLoading: uomLoading } = useGetUOMsQuery();
  const uomNames = uomData?.map((uom:IUOM) => uom.name) || [];

  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Stock and Measurement</h2>
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className={LABEL_CLASS}>Base</label>
          <Autocomplete
            data={uomNames}
            value={data.base}
            onChange={(value) => handleChange({ target: { name: 'stockAndMeasurement.base', value } } as any)}
            onNoMatchClick={() => onCreateUOM('base', data.base)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Purchase</label>
          <Autocomplete
            data={uomNames}
            value={data.purchase}
            onChange={(value) => handleChange({ target: { name: 'stockAndMeasurement.purchase', value } } as any)}
            onNoMatchClick={() => onCreateUOM('purchase', data.purchase)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Sales</label>
          <Autocomplete
            data={uomNames}
            value={data.sales}
            onChange={(value) => handleChange({ target: { name: 'stockAndMeasurement.sales', value } } as any)}
            onNoMatchClick={() => onCreateUOM('sales', data.sales)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Stock</label>
          <Autocomplete
            data={uomNames}
            value={data.stock}
            onChange={(value) => handleChange({ target: { name: 'stockAndMeasurement.stock', value } } as any)}
            onNoMatchClick={() => onCreateUOM('stock', data.stock)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Opening Stock</label>
         <input
            type="number"
            name="stockAndMeasurement.openingStock"
            value={data.openingStock}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Minimum Stock</label>
          <input
            type="number"
            name="stockAndMeasurement.minimumStock"
            value={data.minimumStock}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Maximum Stock</label>
          <input
            type="number"
            name="stockAndMeasurement.maximumStock"
            value={data.maximumStock}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Re-Order Level</label>
          <input
            type="number"
            name="stockAndMeasurement.reOrderLevel"
            value={data.reOrderLevel}
            onChange={handleChange}
            className={INPUT_CLASS}
            required
            min="0"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Re-Order Qty</label>
          <input
            type="number"
            name="stockAndMeasurement.reOrderQty"
            value={data.reOrderQty}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  );
};

export default StockAndMeasurementForm;