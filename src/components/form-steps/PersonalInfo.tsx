import { useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import type { FormData } from '../../context/FormContext';

const PersonalInfo = ({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) => {
  const { formData, handleFieldChange } = useForm();

  const validateFields = () => {
    const isFirstNameValid = formData.firstName.trim().length >= 2;
    const isLastNameValid = formData.lastName.trim().length >= 2;
    const isDateValid = formData.dateOfBirth && new Date(formData.dateOfBirth) < new Date();
    
    const isValid = Boolean(isFirstNameValid && isLastNameValid && isDateValid);
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (field: keyof Pick<FormData, 'firstName' | 'lastName' | 'dateOfBirth'>, value: string) => {
    handleFieldChange(field, value);
  };

  useEffect(() => {
    validateFields();
  }, [formData]); // Run validation when formData changes or component mounts

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">First Name</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please enter your legal first name as it appears on your official documents.
        </p>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Last Name</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please enter your legal last name as it appears on your official documents.
        </p>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your last name"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Date of Birth</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Please select your date of birth. You must be at least 18 years old to participate.
        </p>
        <input
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
};

export default PersonalInfo; 