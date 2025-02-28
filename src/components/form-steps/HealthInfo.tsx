import { useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import type { FormData } from '../../context/FormContext';

const HealthInfo = ({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) => {
  const { formData, handleFieldChange } = useForm();

  const validateFields = () => {
    const isSmokingStatusValid = ['never', 'former', 'active'].includes(formData.smokingStatus);
    const isChronicConditionsValid = !formData.hasChronicConditions || (formData?.hasChronicConditions && formData?.chronicConditionDetails?.trim()?.length > 0);
    const isValid = isSmokingStatusValid && isChronicConditionsValid;
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (
    field: keyof Pick<FormData, 'hasChronicConditions' | 'chronicConditionDetails' | 'smokingStatus'>,
    value: string | boolean
  ) => {
    handleFieldChange(field, value);
  };
  useEffect(() => {
    console.log("formData", formData);
    validateFields();
  }, [formData]); // Run validation when formData changes or component mounts

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Chronic Conditions</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please indicate if you have any ongoing medical conditions that require regular treatment.
        </p>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasChronicConditions === true}
              onChange={() => handleChange('hasChronicConditions', true)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.hasChronicConditions === false}
              onChange={() => handleChange('hasChronicConditions', false)}
              className="form-radio text-primary w-5 h-5"
            />
            <span className="ml-2 text-base">No</span>
          </label>
        </div>
      </div>

      {formData.hasChronicConditions && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Condition Details</h3>
          <p className="text-base text-gray-600 mt-1 mb-3">
            Please describe your chronic conditions and any ongoing treatments.
          </p>
          <textarea
            id="chronicConditionDetails"
            value={formData.chronicConditionDetails}
            onChange={(e) => handleChange('chronicConditionDetails', e.target.value)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={4}
            placeholder="Describe your conditions here"
          />
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Smoking Status</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please indicate your current smoking status.
        </p>
        <select
          value={formData.smokingStatus}
          onChange={(e) => handleChange('smokingStatus', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select status</option>
          <option value="never">Never smoked</option>
          <option value="former">Former smoker</option>
          <option value="active">Active smoker</option>
        </select>
      </div>
    </div>
  );
};

export default HealthInfo; 