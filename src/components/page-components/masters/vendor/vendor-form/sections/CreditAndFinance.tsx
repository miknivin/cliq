/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../shared/InputField";
import FormSection from "../shared/FormSection";
import AutocompleteField from "../shared/AutoCompleteField";
import { CURRENCY_SUGGESTIONS } from "@/app/constants/vendorForm";
import { useGetCurrenciesQuery } from "@/app/redux/api/masters/currencyApi";
import { debounce } from 'lodash';
import {  useState, useMemo } from 'react';
import TextAreaField from "../shared/TextAreaField";



interface CreditAndFinanceProps {
  control: any;
  errors: any;
  onNoMatchClick: (field: string) => void;
}

const CreditAndFinance: React.FC<CreditAndFinanceProps> = ({ control, errors, onNoMatchClick }) => { 
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const { data: currencies, isLoading } = useGetCurrenciesQuery({ searchTerm });

  // Transform API response to array of currency codes
  const currencySuggestions = useMemo(() => {
    if (currencies) {
      return currencies.map((currency: any) => currency.code);
    }
    // Fallback to CURRENCY_SUGGESTIONS if API data is not available
    return CURRENCY_SUGGESTIONS;
  }, [currencies]);

  // Debounce the search term setter
  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const handleLiveInput = (value: string) => {
    console.log('User is typing:', value);
    debouncedSearch(value);
  };

  return (
    <FormSection title="Credit & Finance">
      <InputField
        label="Credit Limit"
        name="creditAndFinance.creditLimit"
        type="number"
        control={control}
        errors={errors.creditAndFinance?.creditLimit}
      />
      <InputField
        label="Due Days"
        name="creditAndFinance.dueDays"
        type="number"
        control={control}
        errors={errors.creditAndFinance?.dueDays}
      />
      <AutocompleteField
        label="Currency"
        name="creditAndFinance.currency"
        suggestions={currencySuggestions}
        control={control}
        isLoading={isLoading}
        onInput={handleLiveInput}
        onNoMatchClick={onNoMatchClick}
      />
      <InputField 
        label="Payment Terms" 
        name="creditAndFinance.paymentTerms" 
        control={control} 
        errors={errors.creditAndFinance?.paymentTerms} 
      />
      <div className="col-span-2">
        <TextAreaField
          label="Remark" 
          name="creditAndFinance.remark" 
          control={control} 
          errors={errors.creditAndFinance?.remark} 
        />
      </div>
    </FormSection>
  );
}

export default CreditAndFinance;