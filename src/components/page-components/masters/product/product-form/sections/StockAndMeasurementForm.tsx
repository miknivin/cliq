import { StockAndMeasurement } from "@/app/redux/slices/masters/productFormSlice";
import { COL_CLASS, COL_HEADING, INPUT_CLASS, LABEL_CLASS } from "@/app/constants/sharedClasses";
import { useGetUOMsQuery } from "@/app/redux/api/masters/uomApi";
import Autocomplete from "@/components/ui/auto-complete/CustomAutocomplete";
import { useState, useEffect, useMemo } from "react";

// Define IUOM interface (assumed based on usage)
interface IUOM {
  _id: string;
  name: string;
  status: string;
}

interface StockAndMeasurementFormProps {
  data: StockAndMeasurement;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCreateUOM: (field: string, value: string) => void;
}

const StockAndMeasurementForm = ({ data, handleChange, onCreateUOM }: StockAndMeasurementFormProps) => {
  const { data: uomData, isLoading: uomLoading } = useGetUOMsQuery();

  // Memoize uomOptions to prevent recomputation on every render
  const uomOptions = useMemo(
    () =>
      uomData
        ?.filter((uom: IUOM) => uom.status === "Active")
        .map((uom: IUOM) => ({ id: uom._id, name: uom.name })) || [],
    [uomData]
  );

  // Local state for display values
  const [baseInput, setBaseInput] = useState(
    uomOptions.find(uom => uom.id === data.base)?.name || ''
  );
  const [purchaseInput, setPurchaseInput] = useState(
    uomOptions.find(uom => uom.id === data.purchase)?.name || ''
  );
  const [salesInput, setSalesInput] = useState(
    uomOptions.find(uom => uom.id === data.sales)?.name || ''
  );
  const [stockInput, setStockInput] = useState(
    uomOptions.find(uom => uom.id === data.stock)?.name || ''
  );

  // Sync local state with Redux state
  useEffect(() => {
    setBaseInput(uomOptions.find(uom => uom.id === data.base)?.name || '');
    setPurchaseInput(uomOptions.find(uom => uom.id === data.purchase)?.name || '');
    setSalesInput(uomOptions.find(uom => uom.id === data.sales)?.name || '');
    setStockInput(uomOptions.find(uom => uom.id === data.stock)?.name || '');
  }, [data.base, data.purchase, data.sales, data.stock, uomOptions]);

  // Handle Autocomplete value change (store _id in Redux)
  const handleUOMChange = (field: string) => (value: string) => {
    const selectedUOM = uomOptions.find(uom => uom.name === value);
    const syntheticEvent = {
      target: {
        name: `stockAndMeasurement.${field}`,
        value: selectedUOM ? selectedUOM.id : '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
    // Update local input state
    switch (field) {
      case 'base':
        setBaseInput(value);
        break;
      case 'purchase':
        setPurchaseInput(value);
        break;
      case 'sales':
        setSalesInput(value);
        break;
      case 'stock':
        setStockInput(value);
        break;
    }
  };

  // Handle typing (update local state, clear Redux state)
  const handleUOMInput = (field: string) => (value: string) => {
    switch (field) {
      case 'base':
        setBaseInput(value);
        break;
      case 'purchase':
        setPurchaseInput(value);
        break;
      case 'sales':
        setSalesInput(value);
        break;
      case 'stock':
        setStockInput(value);
        break;
    }
    // Clear Redux state to avoid invalid _id
    const syntheticEvent = {
      target: {
        name: `stockAndMeasurement.${field}`,
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);
  };

  // Handle creation
  const handleCreateUOM = (field: string, value: string) => {
    onCreateUOM(field, value);
    // Reset local input after creation
    switch (field) {
      case 'base':
        setBaseInput('');
        break;
      case 'purchase':
        setPurchaseInput('');
        break;
      case 'sales':
        setSalesInput('');
        break;
      case 'stock':
        setStockInput('');
        break;
    }
  };

  return (
    <div className={COL_CLASS}>
      <h2 className={COL_HEADING}>Stock and Measurement</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Base</label>
          <Autocomplete
            data={uomOptions.map(uom => uom.name)}
            value={baseInput}
            onChange={handleUOMChange('base')}
            onInput={handleUOMInput('base')}
            onNoMatchClick={() => handleCreateUOM('base', baseInput)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Purchase</label>
          <Autocomplete
            data={uomOptions.map(uom => uom.name)}
            value={purchaseInput}
            onChange={handleUOMChange('purchase')}
            onInput={handleUOMInput('purchase')}
            onNoMatchClick={() => handleCreateUOM('purchase', purchaseInput)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Sales</label>
          <Autocomplete
            data={uomOptions.map(uom => uom.name)}
            value={salesInput}
            onChange={handleUOMChange('sales')}
            onInput={handleUOMInput('sales')}
            onNoMatchClick={() => handleCreateUOM('sales', salesInput)}
            isLoading={uomLoading}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Stock</label>
          <Autocomplete
            data={uomOptions.map(uom => uom.name)}
            value={stockInput}
            onChange={handleUOMChange('stock')}
            onInput={handleUOMInput('stock')}
            onNoMatchClick={() => handleCreateUOM('stock', stockInput)}
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