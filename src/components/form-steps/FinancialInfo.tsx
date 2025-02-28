import { useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import type { FormData } from '../../context/FormContext';

const FinancialInfo = ({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) => {
  const { formData, handleFieldChange } = useForm();

  const validateFields = () => {
    const isIncomeValid = !isNaN(Number(formData.annualIncome)) && Number(formData.annualIncome) >= 0;
    const isValid = isIncomeValid && 
      formData.hasSavings !== undefined && 
      formData.hasInsurance !== undefined;
    
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (
    field: keyof Pick<FormData, 'annualIncome' | 'hasSavings' | 'hasInsurance'>,
    value: string | boolean
  ) => {
    handleFieldChange(field, value);
  };
  useEffect(() => {
    validateFields();
  }, [formData]); // Run validation when formData changes or component mounts

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Annual Income</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please enter your total annual income before taxes and deductions.
        </p>
        <input
          type="number"
          id="annualIncome"
          value={formData.annualIncome}
          onChange={(e) => handleChange('annualIncome', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          min="0"
          step="1000"
          placeholder="Enter amount in USD"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Savings Status</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Do you have any savings or emergency funds set aside?
        </p>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasSavings === true}
              onChange={() => handleChange('hasSavings', true)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasSavings === false}
              onChange={() => handleChange('hasSavings', false)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">No</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Insurance Coverage</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Do you currently have any form of health insurance?
        </p>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasInsurance === true}
              onChange={() => handleChange('hasInsurance', true)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasInsurance === false}
              onChange={() => handleChange('hasInsurance', false)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo; 